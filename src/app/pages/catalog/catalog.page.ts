import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
})
export class CatalogPage implements OnInit {

  gallery: any = [
    { "id": "1", "name": "Yoga and Meditation", "image": "/assets/img/sport4.jpg" },
    { "id": "1", "name": "Fitness", "image": "/assets/img/sport2.jpg"},
    { "id": "1", "name": "Running", "image": "/assets/img/sport3.jpg" },
  ];

  posts: any = [
    { "id": "1", "name": "Say goodby to your glasses", "image": "/assets/img/post1.jpg" },
    { "id": "1", "name": "Forget the diet", "image": "/assets/img/post2.jpg"},
    { "id": "1", "name": "Running", "image": "/assets/img/sport3.jpg" },
  ];



  constructor() { }

  ngOnInit() {
  }

}
