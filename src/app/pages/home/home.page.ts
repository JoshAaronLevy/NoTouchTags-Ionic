import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  constructor() { }

  gallery: any = [
    { "id": "1", "name": "Urban Running", "image": "/assets/img/sport.jpg" },
    { "id": "1", "name": "Fitness", "image": "/assets/img/sport2.jpg"},
    { "id": "1", "name": "Yoga", "image": "/assets/img/sport3.jpg" },
  ];

  products: any = [
    { "name": "Air Pro", "image": "/assets/img/air.png", "price": "134" },
    { "name": "Fuel Fusion", "image": "/assets/img/air3.png", "price": "89" },
  ];

  
  ngOnInit() {
  }

}
