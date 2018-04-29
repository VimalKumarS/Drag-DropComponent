// // Copyright (C) 2016 Sergey Akopkokhyants // This project is licensed under
// the terms of the MIT license. // https://github.com/akserg

import {
    Component,
    ComponentFactoryResolver,
    Type,
    ViewChild,
    ViewContainerRef,
    OnInit,
    OnDestroy,
    Input,
    Output,
    EventEmitter,
    ReflectiveInjector,
    ComponentRef
} from '@angular/core';
import {SimpleMarketComponent} from '../simple-market/simple-market.component'
import {ComplexMarketComponent} from '../complex-market/complex-market.component'
import {ComponentConfig,compMap, StyleMap} from '../model/component.config'
import { ResizeEvent } from 'angular-resizable-element';

@Component({selector: 'component-wrapper',
styleUrls: ['./base.component.css'],
entryComponents: [SimpleMarketComponent, ComplexMarketComponent],
templateUrl: './base.component.html'})

export class BaseComponent implements OnInit,
OnDestroy {

    currentComponent = null;
    id="";
    componetConfig :ComponentConfig
    @ViewChild('container', {read: ViewContainerRef})dynamicComponentContainer : ViewContainerRef;
    @Input()  style : object;
    @Output() removeEvent : EventEmitter <string> = new EventEmitter <string> ();

    @Input('componentData')set componentData(data : ComponentConfig) {
        if (!data) {
            return;
        }
        this.componetConfig =data;
        this.id= data.renderId;
        // Inputs need to be in the following format to be resolved properly
        let inputProviders = Object
            .keys(data.inputs)
            .map((inputName) => {
                return {provide: inputName, useValue: data.inputs[inputName]};
            });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);

        // We create an injector out of the data we want to pass down and this
        // components injector
        let injector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.dynamicComponentContainer.parentInjector);

        // We create a factory out of the component we want to create
        let factory = this
            .componentFactoryResolver
            .resolveComponentFactory(compMap[data.name]);

        // We create the component using the factory and the injector
        let componentRef = factory.create(injector);

        // We insert the component into the dom container
        this
            .dynamicComponentContainer
            .insert(componentRef.hostView);

        // We can destroy the old component is we like by calling destroy
        if (this.currentComponent) {
            this
                .currentComponent
                .destroy();
        }

        this.currentComponent = componentRef;
    }

    get getComponentData(): ComponentConfig {
        return this.componetConfig;
    }

    constructor(private componentFactoryResolver : ComponentFactoryResolver) {}
    ngOnInit() {}

    onResizeEnd(event: ResizeEvent): void {
        //console.log('Element was resized', event);
        this.style = {
            position:'fixed',
            left: `${event.rectangle.left}px`,
            top: `${event.rectangle.top}px`,
            width: `${event.rectangle.width}px`,
            height: `${event.rectangle.height}px`
          };
          this.componentData.style= <StyleMap>this.style;
      }
      validate(event: ResizeEvent): boolean {
        const MIN_DIMENSIONS_PX: number = 50;
        const MIN_width_px =1300;
        const MIN_Height_px =755;
        if(event.rectangle.height + event.rectangle.top > MIN_Height_px){
            return false
        }
        if(event.rectangle.width + event.rectangle.left > MIN_width_px){
            return false
        }      
        return true;
        
      }

      removeWidget($event :Event,id:string){
        $event.stopPropagation();
      
        this
                .currentComponent
                .destroy();
                this.removeEvent.emit(id)
       
      }
    ngOnDestroy() {}
}


/*
var cmpRef = this.vcRef.createComponent(factory, 0, injector);
 cmpRef.instance.someInput = value;
 cmpRef.instance.someOutput.subscribe(data => this.data = data);
*/