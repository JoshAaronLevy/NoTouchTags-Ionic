import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-result',
  templateUrl: './result.page.html',
  styleUrls: ['./result.page.scss'],
})
export class ResultPage implements OnInit {

  products: any = [
    { "name": "Air Pro Max 2005", "image": "/assets/img/air.png", "price": 125 },
    { "name": "Air Retro Should", "image": "/assets/img/retro.png", "price": 125 },
    { "name": "Dark Mode", "image": "/assets/img/air2.png", "price": 125 }
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
