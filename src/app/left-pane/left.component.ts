// // Copyright (C) 2016 Sergey Akopkokhyants // This project is licensed under
// the terms of the MIT license. // https://github.com/akserg

import {Component, style} from '@angular/core';
import {ComponentConfig,compMap,StyleMap} from '../model/component.config'

@Component({selector: 'drag-drop-listAllComponent',
styleUrls: ['./left.component.css'],
templateUrl: './left.component.html'})
export class ListAllComponent {
    transferData : Array <ComponentConfig > = [
        {
            id: 1,
            name: 'SimpleMarketComponent',
            title: 'Simple Market Component',
            inputs:{'showNum':2,'simpleObject':{'a':1}},
            style: <StyleMap>{},
            renderId:null,
           
        }, {
            id: 2,
            name: 'ComplexMarketComponent',
            title: 'Complex Market Component',
            inputs:{'showNum':2},
            style: <StyleMap>{},
            renderId:null,
          
        }
    ];

    onDrag($event: any) {
        //console.log($event)
    }
}
