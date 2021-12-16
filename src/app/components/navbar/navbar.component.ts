import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
  <mat-toolbar color="primary">
    <span>Restaurant</span>
    <span class="spacer"></span>
    <div  class="example-button-row">
      <button *ngFor="let item of navbarLinks"
              mat-button 
              [routerLink]="item.url"
              routerLinkActive="active">
        {{item.text}}
      </button>
      <button mat-icon-button
              routerLink="/home"
              routerLinkActive="active">
        <mat-icon>home</mat-icon>
      </button>
    </div>
  </mat-toolbar>
  `,
  styles: [`
    mat-toolbar{
      position: sticky;
      top: 0;
      z-index: 1000;
    }
    
    .active{
      transition: .5s ease all;
      background-color: #fff;
      color: #c2185b;
    }
  `]
})
export class NavbarComponent implements OnInit {

  navbarLinks = [
    {url:'/suppliers',text: 'Suppliers'},
    {url:'/reservations',text: 'Reservations'},
    {url:'/menus', text: 'Menus'},
    {url:'/employees', text: 'Employees'},
    {url:'/dishes', text: 'Dishes'},
    {url:'/customers', text: 'Customers'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
