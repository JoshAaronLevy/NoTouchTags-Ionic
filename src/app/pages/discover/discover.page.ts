import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {
  gallery: any = [
    { "id": "1", "name": "Street Fighters", "image": "/assets/img/basket.jpg" },
    { "id": "1", "name": "Trends", "image": "/assets/img/fashion.jpg"},
    { "id": "1", "name": "Yoga", "image": "/assets/img/sport3.jpg" },
  ];

  products: any = [
    { "name": "Air Pro", "image": "/assets/img/air.png", "price": "134" },
    { "name": "Fuel Fusion", "image": "/assets/img/air3.png", "price": "89" },
  ];
  constructor() { }

  ngOnInit() {
  }

}
