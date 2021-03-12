import { Component, OnInit } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

  product: any =
    { "name": "Air Pro Max", "image": "/assets/img/air.png", "price": "125.00", "logo": "/assets/img/nike.svg" };

  images: any = [
    { "image": "/assets/img/air.png" },
    { "image": "/assets/img/retro.png" },
    { "image": "/assets/img/air2.png" }
  ]

  sizes: any = [
    { "number": 41 , "selected": false}, { "number": 42, "selected": false },
     { "number": 43, "selected": true }, { "number": 45, "selected": false }, 
     { "number": 46, "selected": false }, { "number": 46.5, "selected": false },
  ]

  slideOpts = {
    spaceBetween: 10,
    slidesPerView: "auto",
    centeredSlides: false,
    initialSlide: 0, 
    speed: 500
  };


  constructor() { }

  ngOnInit() {
  }

}
