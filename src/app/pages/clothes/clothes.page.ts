import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-clothes',
  templateUrl: './clothes.page.html',
  styleUrls: ['./clothes.page.scss'],
})
export class ClothesPage implements OnInit {

  product: any =
  { "name": "Raw Hoodie", "price": "50.00"};

images: any = [
  { "image": "/assets/img/hoodie.webp" }
]

models: any = [
  { "number": "S" , "selected": false}, { "number": "M", "selected": true }, { "number": "L", "selected": false }
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
