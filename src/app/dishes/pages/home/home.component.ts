import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <div  class="content__container">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [``]  
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
