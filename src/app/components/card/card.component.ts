import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styles: [`
    mat-card{
      display: flex;
      flex-flow: row nowrap;
      width: 90%;
      margin-bottom: .5rem;
    }

    p{
      margin:0 !important;
      padding: 0 !important;
      font-size: 1.1rem;
    }
    
    .del__btn,.edit__btn{
      color: #fff;
        margin-right: .5rem;
    
    }
    
    .del__btn{
      background-color: #be4258;
    }
    
    .edit__btn{
      background-color: #3587A4;
    }
  `]
})
export class CardComponent implements OnInit {

  @Input() title:string = 'default title';
  @Input() subtitle:string = 'default subtitle';
  @Input() description:string = 'default description';

  constructor() { }

  ngOnInit(): void {
  }

}
