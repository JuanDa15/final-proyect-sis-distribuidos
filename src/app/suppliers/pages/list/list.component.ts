import { Component, OnInit } from '@angular/core';
import { supplierInterface } from 'src/app/interfaces/supplier.interface';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list:supplierInterface[];
  totalSuppliers:number;
  firstItem:number;
  lastItem:number;
  hasNextPage:boolean;
  hasPreviusPage:boolean;


  constructor(private supplierService:SupplierService) {
    this.list = [];
    this.totalSuppliers = 0;
    this.firstItem = 0;
    this.lastItem = 9;
    this.hasNextPage = false;
    this.hasPreviusPage = false;
  }

  ngOnInit(): void {
    this.fetchData(`${this.firstItem}-${this.lastItem}`);
  }

  fetchData(pagination:string){
    this.supplierService.getSuppliers(pagination)
      .subscribe({
        next: (val:any) => {
          (this.firstItem !== 0)? this.hasPreviusPage = true: this.hasPreviusPage = false;
          ( this.lastItem < val.count)? this.hasNextPage = true: this.hasNextPage = false;
          if(val.data.length !== 0){
            this.list = val.data;
            this.totalSuppliers = val.count;
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
    this.supplierService.deleteSupplier(id)
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
        error: (err) => Swal.fire({
          icon:'error',
          text:'Error while deleting',
          timer:1500
        })
      })
  }


}
