import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgDraggableWidgetModule } from 'ngx-draggable-widget';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import {HomeComponent} from './drag-drop/home.component'
import {BaseComponent} from './BaseComponent/base.component'
import {DraggableContianer} from './right-pane/right.component'
import {ListAllComponent} from './left-pane/left.component'
import { DndModule } from 'ng2-dnd';
import { ResizableModule } from 'angular-resizable-element';
import {SimpleMarketComponent} from './simple-market/simple-market.component'
import {ComplexMarketComponent} from './complex-market/complex-market.component'
@NgModule({
  declarations: [
    AppComponent,HomeComponent,ListAllComponent,DraggableContianer,BaseComponent,SimpleMarketComponent,ComplexMarketComponent
  ],
  entryComponents:[BaseComponent],
  imports: [
    BrowserModule,routing, DndModule.forRoot(),NgDraggableWidgetModule,ResizableModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
