import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements OnInit {

  @Input() title!:string;
  @Input() btnLink!:string;

  constructor() { }

  ngOnInit(): void {
  }

}
