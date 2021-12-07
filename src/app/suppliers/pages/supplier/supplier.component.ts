import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { supplierInterface } from 'src/app/interfaces/supplier.interface';
import { SupplierService } from 'src/app/services/supplier.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

interface typeList {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class SupplierComponent implements OnInit {

  id:number;
  typeList: typeList[] = [
    {value: 'Meat', viewValue: 'Meat'},
    {value: 'Vegetables', viewValue: 'Vegetables'},
    {value: 'Drinks', viewValue: 'Drinks'},
    {value: 'Utensils', viewValue: 'Utensils'}
  ];

  supplierForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    nit : new FormControl('', [Validators.required]),
    type:  new FormControl('', [Validators.required])
  })

  matcher = new MyErrorStateMatcher();



  constructor(private supplierService:SupplierService,
              private router:Router,
              private AR:ActivatedRoute){
                this.id = 0;
              }


  ngOnInit(): void {
    this.supplierForm.get('nit')?.disable();
    this.AR.params.pipe(
      switchMap((param:any) => {
          this.id = param.id;
          return this.supplierService.getSupplier(param.id)
        })
      ).subscribe({
        next: (val:any) => this.supplierForm.patchValue(val.data),
        error: ()=>{}
      })

    
  }
            

  onSubmit(){
    if(this.supplierForm.valid){
      

      let bodyRequest:supplierInterface = this.supplierForm.value; 

      this.supplierService.updateSupplier(bodyRequest,this.id)
          .subscribe({
            next: () => {
              Swal.fire({
              text: "Sucessfully Edited",
              icon: "success",
              timer: 1500,
              position: 'center'
            });
            this.router.navigateByUrl('/suppliers/list');
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
