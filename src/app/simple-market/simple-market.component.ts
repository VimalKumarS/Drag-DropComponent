import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-simple-market',
  templateUrl: './simple-market.component.html',
  styleUrls: ['./simple-market.component.css']
})
export class SimpleMarketComponent implements OnInit {

  constructor(private injector: Injector) {
    console.log(this.injector.get('showNum'));
   }

  ngOnInit() {
  }

}
