import { Component, OnInit } from '@angular/core';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {

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
