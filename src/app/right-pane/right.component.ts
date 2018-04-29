// // Copyright (C) 2016 Sergey Akopkokhyants
// // This project is licensed under the terms of the MIT license.
// // https://github.com/akserg

import { Component, ViewContainerRef, ViewChild, Type, ComponentFactoryResolver,ChangeDetectorRef, ComponentRef } from '@angular/core';
import { INgWidgetContainerConfig, INgWidgetConfig, INgWidgetEvent, NgWidgetContainer } from 'ngx-draggable-widget';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import {delay} from 'rxjs/operator/delay';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/Rx';
import { containerConfig, WidgetMetaData, widgetmetadatas,
          IWidgetDashboard } from '../model/dashboard';

const widgetconfig$ = Observable.of(containerConfig);
const widgetitems$ = Observable.of(widgetmetadatas).delay(2000);
import {ComponentConfig,compMap,ComponentMap} from '../model/component.config'
import { ResizeEvent } from 'angular-resizable-element';
import {BaseComponent} from '../BaseComponent/base.component'
@Component({
    selector: 'drag-drop-container',
    styleUrls: ['./right.component.css'],
    templateUrl: './right.component.html'
})

export class DraggableContianer { 
    transferData : Array < ComponentConfig > = []
     
    components :   Array<ComponentMap> = [];

    @ViewChild('parentContainer', {read: ViewContainerRef}) container: ViewContainerRef;
    constructor(private componentFactoryResolver: ComponentFactoryResolver,private cd: ChangeDetectorRef) {
    }
    
    public style: object = {};
    // public containerConfig$ =containerConfig;
    // public dashboardconfig$ = Observable.forkJoin(widgetconfig$, widgetitems$, (widgetconfig, widgetitems) => {
    //     return {
    //         'WidgetContainer': widgetconfig
    //     };
    // });
 
    onDrop($event: any) {
        let dragdata: ComponentConfig = $event.dragData;        
        this.transferData.push(Object.assign({},dragdata));  
        this.addComponent(dragdata)  ;
    }

    addComponent(componentClass: ComponentConfig) {
        // Create component dynamically inside the ng-template
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(BaseComponent);
        const component = this.container.createComponent(componentFactory);
        component.instance.style = {
            left: `100px`,
            top: `100px`
          }
          componentClass.renderId =  this.guid();
        component.instance.componentData = componentClass;
        component.instance.removeEvent.subscribe((data:string) =>{ 
            console.log(data)
            let componentIndex = this.components.findIndex(x=> x.key == data)
            this.container.remove(componentIndex);
            this.components[componentIndex].ComponentRef.destroy();
            this.components.splice(componentIndex, 1);
            //this.cd.detectChanges();
        }) ;
        // Push the component so that we can keep track of which components are created
        this.components.push(Object.assign({},{ key: componentClass.renderId,
            ComponentRef:component}
        ));
      }
      
     private guid() {
        function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }

//   removeComponent(componentClass: Type<any>) {

//     // Find the component
//     const component = this.components.find((component) => component.instance instanceof componentClass);
//     const componentIndex = this.components.indexOf(component);

//     if (componentIndex !== -1) {
//       // Remove component from both view and array
//       this.container.remove(this.container.indexOf(component));
//       this.components.splice(componentIndex, 1);
//     }
//   }
    
     
}
