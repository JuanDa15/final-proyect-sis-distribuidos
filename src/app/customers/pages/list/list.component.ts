import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CustomerInterface } from 'src/app/interfaces/customer.interface';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list:CustomerInterface[];
  totalCustomers:number;
  firstItem:number;
  lastItem:number;
  hasNextPage:boolean;
  hasPreviusPage:boolean;
  searchType:string;
  notFound:boolean = false;

  @ViewChild('type') type!:ElementRef;


  constructor(private customerService:CustomerService) {
    this.list = [];
    this.totalCustomers = 0;
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
    this.customerService.getCustomers(pagination)
      .subscribe({
        next: (val:any) => {
          (this.firstItem !== 0)? this.hasPreviusPage = true: this.hasPreviusPage = false;
          ( this.lastItem < val.count)? this.hasNextPage = true: this.hasNextPage = false;
          if(val.data.length !== 0){
            this.list = val.data;
            this.totalCustomers = val.count;
          }
        },
        error: () => {}
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
    this.customerService.deleteCustomer(id)
      .subscribe({
        next: () => {
          this.firstItem = 0;
          this.lastItem = 9;
          this.fetchData(`${this.firstItem}-${this.lastItem}`);
          Swal.fire({
            icon:'success',
            text:'Successfully deleted',
            timer:1500
          })
        },
        error: (err:any) => Swal.fire({
          icon:'error',
          text:'Error while deleting',
          timer:1500
        })
      })
  }


  search(e:string){
    let field = this.type.nativeElement.value;
    this.customerService.filter(field,e).subscribe({
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
