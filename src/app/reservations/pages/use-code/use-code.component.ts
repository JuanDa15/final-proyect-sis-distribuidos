import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-use-code',
  templateUrl: './use-code.component.html',
  styleUrls: ['./use-code.component.scss']
})
export class UseCodeComponent{

  reservationInfo!:ReservationInterface;

  reservationForm = new FormGroup({
    code: new FormControl('',[Validators.required])
  })

  matcher = new MyErrorStateMatcher();



  constructor(private reservationService:ReservationService,
              private router:Router){}

  onSubmit(){
    if(this.reservationForm.valid){
      

      let bodyRequest = this.reservationForm.value; 

      this.reservationService.code(bodyRequest.code)
          .subscribe({
            next: (val:any) => {
              Swal.fire({
              text: "Successfull",
              icon: "success",
              timer: 1500,
              position: 'center'
            });
            this.reservationInfo = val.data;
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
}
