import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.page.html',
  styleUrls: ['./index.page.scss'],
})
export class IndexPage implements OnInit {

  pages: any = [
    { "name": "splash" },
    { "name": "login" },
    { "name": "register" },
    { "name": "forgot" },
    { "name": "home" },
    { "name": "product" },
    { "name": "watch" },
    { "name": "forniture" },
    { "name": "clothes" },
    { "name": "list" },
    { "name": "filter" },
    { "name": "mosaic" },
    { "name": "catalog" },
    { "name": "cart" },
    { "name": "profile" },
    { "name": "account" },
    { "name": "checkout" },
    { "name": "cards" },
    { "name": "address" },
    { "name": "hero" },
    { "name": "result" },
    { "name": "discover" }
  ];

  constructor() { }

  ngOnInit() {
  }

}
