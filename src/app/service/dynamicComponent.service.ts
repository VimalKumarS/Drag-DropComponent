import {
    ComponentFactoryResolver,
    Injectable,
    Inject,
    ReflectiveInjector,
    ViewContainerRef
  } from '@angular/core'
  

  @Injectable()
  export class Service {
    public rootViewContainer: ViewContainerRef
    constructor(private factoryResolver: ComponentFactoryResolver) { }
  
    public setRootViewContainerRef(viewContainerRef) {
      this.rootViewContainer = viewContainerRef
    }
  
    public addDynamicComponent(dynamicComponent) {
      const factory = this.factoryResolver.resolveComponentFactory(dynamicComponent)
      const component = factory.create(this.rootViewContainer.parentInjector)      
      this.rootViewContainer.insert(component.hostView)
    }
  
  }
  