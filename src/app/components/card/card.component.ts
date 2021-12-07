import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styles: [`
    mat-card{
      display: flex;
      flex-flow: row nowrap;
      width: 90%;
      margin-bottom: .5rem;

      img{
        width: 175px;
        height: 125px;
        border-radius: .5rem;
        margin-right: .5rem;
        border: 2px solid #be4258;
      }
    }

    p{
      margin:0 !important;
      padding: 0 !important;
      font-size: 1.1rem;

      &::first-letter{
        text-transform: capitalize;
      }
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

  @Input() title:string = '';
  @Input() subtitle:string = '';
  @Input() description:string = '';
  @Input() img:string = '';
  @Input() id!:any;
  @Input() editUrl!:string;


  @Output() OnDelete:EventEmitter<number> = new EventEmitter();

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  deleteItem(){
    this.OnDelete.emit(this.id);
  }

  editItem(){
    this.router.navigate([this.editUrl,this.id]);
  }
}
