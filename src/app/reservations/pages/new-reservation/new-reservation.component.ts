import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface tableList {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent{

  token:string = '';

  tableList: tableList[] = [
    {value: '1', viewValue: '1'},
    {value: '2', viewValue: '2'},
    {value: '3', viewValue: '3'},
    {value: '4', viewValue: '4'},
    {value: '5', viewValue: '5'},
    {value: '6', viewValue: '6'},
    {value: '7', viewValue: '7'},
    {value: '8', viewValue: '8'},
    {value: '9', viewValue: '9'},
    {value: '10', viewValue: '10'}
  ];

  reservationForm = new FormGroup({
    owner : new FormControl('', [Validators.required]),
    document : new FormControl('', [Validators.required]),
    table:  new FormControl('', [Validators.required]),
    date: new FormControl('',[Validators.required])
  })

  matcher = new MyErrorStateMatcher();



  constructor(private reservationService:ReservationService,
              private router:Router,
              private clipboardApi: ClipboardService){
                this.mindate()
              }

  onSubmit(){
    if(this.reservationForm.valid){
      

      let bodyRequest:ReservationInterface = this.reservationForm.value; 

      this.reservationService.addReservation(bodyRequest)
          .subscribe({
            next: () => {
              Swal.fire({
              text: "Successfully created",
              icon: "success",
              timer: 1500,
              position: 'center'
            });
            this.tokenGenerator();
          },
            error: (err:any) => Swal.fire({
              icon:'error',
              timer:1500,
              position: 'center',
              text: `${err.error.detailed}`
            })
          })
    }
  }

  mindate(){
    const date = new Date();
    const dd = (date.getDate() < 10)? '0'+ date.getDate() : date.getDate();
    const mm = (date.getMonth() < 10)? '0'+ date.getMonth() : date.getMonth();
    const today = date.getFullYear()+'-'+(Number(mm) + 1)+'-'+dd;
    return today.toString();
  }

  tokenGenerator(){
    this.token =  new Date().getTime().toString();
  }

  copyText(){
    this.clipboardApi.copyFromContent(this.token);
    Swal.fire({
      icon:'success',
      text:'Copy to clipboard',
      timer: 1500
    });
    setTimeout(()=>{
      this.router.navigateByUrl('/reservations/list');
    },10000)
  }
}
