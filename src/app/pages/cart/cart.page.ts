import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  
  products: any = [
    { "name": "Air Pro", "image": "/assets/img/air.png", "price": "125.00", "amount" : 1 },
    { "name": "Air Retro", "image": "/assets/img/retro.png", "price": "85.00", "amount" : 2 },
    { "name": "Green Coast", "image": "/assets/img/adidas2.png", "price": "134.00", "amount" : 1 }
  ];

  constructor() { }

  ngOnInit() {
  }

}
