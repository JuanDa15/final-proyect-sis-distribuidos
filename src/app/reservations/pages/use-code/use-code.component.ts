import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
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

  reservationForm = new FormGroup({
    document : new FormControl('', [Validators.required]),
    code: new FormControl('',[Validators.required])
  })

  matcher = new MyErrorStateMatcher();



  constructor(private reservationService:ReservationService,
              private router:Router){}

  onSubmit(){
    if(this.reservationForm.valid){
      

      let bodyRequest = this.reservationForm.value; 

      console.log(bodyRequest);
      // this.reservationService.addReservation(bodyRequest)
      //     .subscribe({
      //       next: () => {
      //         Swal.fire({
      //         text: "Successfully created",
      //         icon: "success",
      //         timer: 1500,
      //         position: 'center'
      //       });
      //     },
      //       error: (err:any) => Swal.fire({
      //         icon:'error',
      //         timer:1500,
      //         position: 'center',
      //         text: `${err.error.detailed}`
      //       })
      //     })
    }
  }
}
