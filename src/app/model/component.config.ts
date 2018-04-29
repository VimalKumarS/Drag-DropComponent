export interface ComponentConfig{
    id:number,
    title:string,
    name:string,
    inputs: AttributesMap,
    style :StyleMap,
    renderId:string
}

export interface AttributesMap {
    [key: string]: {}
  } 

  export interface ComponentMap {
    key:string,
    ComponentRef:ComponentRef<{}>
  } 


  export interface StyleMap{
    position: string,
    left: string,
    top: string
    width: string,
    height: string
  }

import {SimpleMarketComponent} from '../simple-market/simple-market.component'
import {ComplexMarketComponent} from '../complex-market/complex-market.component'
import { ComponentRef } from '@angular/core';

export const compMap = {
    "SimpleMarketComponent": SimpleMarketComponent,
    "ComplexMarketComponent": ComplexMarketComponent
  };