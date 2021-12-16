import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { DishInterface } from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [`
    .paginator{
      width:90%;
      background-color: #424242;
      display: flex;
      flex-flow: row nowrap;
      padding: .5rem;
      justify-content: flex-end;
      border-radius: .3rem;
      box-shadow: 0px 1px 1px #222;
      margin-bottom: 2rem;
    }

    .buttons{
      margin-left: 1rem;
    }

    .info1,.info2{
      font-size: .8rem;
    }

    .info2{
      margin-left: 1rem;
    }
  `]
})
export class ListComponent implements OnInit {

  
  list:DishInterface[];
  totalDishes:number;
  firstItem:number;
  lastItem:number;
  hasNextPage:boolean;
  hasPreviusPage:boolean;
  searchType:string;
  notFound:boolean = false;
  
  constructor(private dishService:DishService) { 
    this.list = [];
    this.totalDishes = 0;
    this.firstItem = 0;
    this.lastItem = 9;
    this.hasNextPage = false;
    this.hasPreviusPage = false;
    this.searchType = 'name';
  }

  ngOnInit(): void {
    this.fetchData(`${this.firstItem}-${this.lastItem}`);
  }

  fetchData(pagination:string){
    this.dishService.getDishes(pagination).subscribe({
      next: (val:any) => {
        (this.firstItem !== 0)? this.hasPreviusPage = true: this.hasPreviusPage = false;
        ( this.lastItem < val.count)? this.hasNextPage = true: this.hasNextPage = false;
        if(val.data.length !== 0){
          this.list = val.data;
          this.totalDishes = val.count;
        }
      },
      error: (err) => console.log(err)
    })
  }

  nextPage(){
    if(this.hasNextPage){
      this.firstItem =  this.firstItem + 10;
      this.lastItem =  this.lastItem + 10;

      this.fetchData(`${this.firstItem}-${this.lastItem}`);

    }
  }

  previusPage(){
    if(this.hasPreviusPage){
      if((this.firstItem > 0) && (this.lastItem > 0)){
        this.firstItem =  this.firstItem - 10;
        this.lastItem =  this.lastItem - 10;
        this.fetchData(`${this.firstItem}-${this.lastItem}`);
      }else{
        this.firstItem = 0;
        this.lastItem = 9;
      }
    }
  }
  
  deleteItem(id:number){
    this.dishService.deleteDish(id)
      .subscribe({
        next: () => {
          this.firstItem = 0;
          this.lastItem = 9;
          this.fetchData(`${this.firstItem}-${this.lastItem}`)
        },
        error: (err) => console.log(err)
      })
  }

  search(e:string){
    let field = this.searchType;
    this.dishService.filter(field,e).subscribe({
      next: (val:any) => {
        if(val.data.length === 0){
          this.notFound = true;
        }else{
          this.list = val.data;
          this.notFound = false;
        }
      }
    })
  }
}
