import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page-content',
  templateUrl: './home-page-content.component.html',
  styleUrls: ['./home-page-content.component.css']
})
export class HomePageContentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.view();
  }
  // view(): void {
  //   const element = document.getElementById('main');
  //   if (element) {
  //     element.scrollIntoView();
  //   }
  // }

}
