import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watch',
  templateUrl: './watch.page.html',
  styleUrls: ['./watch.page.scss'],
})
export class WatchPage implements OnInit {
  product: any =
    { "name": "SmartWatch", "image": "/assets/img/watch.png", "price": "125.00", "logo": "/assets/img/android.svg" };

  images: any = [
    { "image": "/assets/img/watch.png" },
    { "image": "/assets/img/forniture.webp" },
    { "image": "/assets/img/air2.png" }
  ]

  models: any = [
    { "number": "8MB" , "selected": false}, { "number": "64MB", "selected": true }, { "number": "128MB", "selected": false }
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
