import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <mat-sidenav-container  fullscreen
                            hasBackdrop="false">
      <navbar></navbar>
      <router-outlet></router-outlet>
    </mat-sidenav-container>
  `,
  styles: [``]
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
