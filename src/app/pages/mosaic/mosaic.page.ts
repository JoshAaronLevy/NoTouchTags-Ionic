import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mosaic',
  templateUrl: './mosaic.page.html',
  styleUrls: ['./mosaic.page.scss'],
})
export class MosaicPage implements OnInit {

  products: any = [
    { "name": "Air Pro", "image": "/assets/img/air.png", "price": "134" },
    { "name": "Air Retro", "image": "/assets/img/retro.png", "price": "89" },
    { "name": "Green Coast", "image": "/assets/img/adidas2.png", "price": "90" },
    { "name": "Dark Mode", "image": "/assets/img/air2.png", "price": "112" },
    { "name": "White Shine", "image": "/assets/img/air3.png", "price": "165" },
    { "name": "Fuel Fusion", "image": "/assets/img/air4.png", "price": "89" },
  ];
  
  constructor() { }

  ngOnInit() {
  }

}
