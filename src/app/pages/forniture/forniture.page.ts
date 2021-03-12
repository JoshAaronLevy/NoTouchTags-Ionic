import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forniture',
  templateUrl: './forniture.page.html',
  styleUrls: ['./forniture.page.scss'],
})
export class ForniturePage implements OnInit {

  product: any =
  { "name": "Blue Velvet", "price": "1250.00"};

images: any = [
  { "image": "/assets/img/forniture.webp" }
]

models: any = [
  { "number": "Small" , "selected": false}, { "number": "Med", "selected": true }, { "number": "Large", "selected": false }
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
