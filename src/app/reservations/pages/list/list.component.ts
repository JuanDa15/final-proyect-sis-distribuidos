import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  list:ReservationInterface[];
  tempList:ReservationInterface[];
  totalReservations:number;
  firstItem:number;
  lastItem:number;
  hasNextPage:boolean;
  hasPreviusPage:boolean;
  searchType:string;
  notFound:boolean = false;

  @ViewChild('type') type!:ElementRef;

  constructor(private reservationService:ReservationService) {
    this.list = [];
    this.totalReservations = 0;
    this.firstItem = 0;
    this.lastItem = 9;
    this.hasNextPage = false;
    this.hasPreviusPage = false;
    this.tempList = [];
    this.searchType = 'date';
  }

  ngOnInit(): void {
    this.fetchData(`${this.firstItem}-${this.lastItem}`);
  }

  fetchData(pagination:string){
    this.reservationService.getReservations(pagination)
      .subscribe({
        next: (val:any) => {
          (this.firstItem !== 0)? this.hasPreviusPage = true: this.hasPreviusPage = false;
          ( this.lastItem < val.count)? this.hasNextPage = true: this.hasNextPage = false;
          if(val.data.length !== 0){
            this.list = val.data;
            this.totalReservations = val.count;
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
    this.reservationService.deleteReservations(id)
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

  // search( e:string){
  //   if(e.trim().length === 0){
  //     this.list = this.tempList;
  //   }else{
  //   // this.reservationService.getReservations('0-9').pipe(
  //   //   switchMap((val:any) => this.reservationService.getReservations(`0-${val.count}`))
  //   // ).subscribe({
  //   //   next:(val:any) => this.searchList = val.data
  //   // })

  //   let fields:string[] = ['date','document','table','owner'];
  //   let arr:any[] = [];

  //   fields.forEach((field:string)=> {
  //     if(this.list.filter((reservation:any) => reservation[field].toString().includes(e)).length != 0){
  //       arr = this.list.filter((reservation:any) => reservation[field].toString().includes(e));
  //     }
  //   })

  //   this.tempList = this.list;
  //   this.list = arr;
  // }}

  search(e:string){
    let field = this.type.nativeElement.value;
    this.reservationService.filter(field,e).subscribe({
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
