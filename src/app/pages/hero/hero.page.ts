import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.page.html',
  styleUrls: ['./hero.page.scss'],
})
export class HeroPage implements OnInit {

  products: any = [
    { "name": "Air Pro", "image": "/assets/img/bottle.jpg", "price": "134" },
    { "name": "Fuel Fusion", "image": "/assets/img/pig1.jpg", "price": "89" },
    { "name": "Air Pro", "image": "/assets/img/bottle.jpg", "price": "134" }

  ];

  constructor() { }

  ngOnInit() {
  }

}
