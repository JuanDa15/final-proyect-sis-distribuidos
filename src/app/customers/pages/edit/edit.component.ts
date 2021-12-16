import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { CustomerService } from 'src/app/services/customer.service';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

interface DocType {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:number;
  customerForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('',[Validators.required]),
    document_type: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required])
  })

  documentTypes: DocType[] = [
    {value: 'C.C.', viewValue: 'Cedula Ciudadania'},
    {value: 'C.E.', viewValue: 'Cedula Extranjeria'},
    {value: 'Passport', viewValue: 'Pasaporte'}
  ];


  constructor(private AR:ActivatedRoute,
              private router:Router,
              private customerService:CustomerService) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.AR.params.pipe(
      switchMap(resp => {
        this.id = resp.id;
        return this.customerService.getCustomer(resp.id);
      })
    ).subscribe({
      next: (val:any) => this.customerForm.patchValue(val.data),
      error: () => {}
    })
  }

  onSubmit(){
    if(this.customerForm.valid){
      this.customerService.updateCustomer(this.customerForm.value,this.id).subscribe({
        next: () => {
          Swal.fire({
            icon:'success',
            text:'Updated Successfully',
            timer: 1500,
          });
          this.router.navigateByUrl('/customers/list');
        },
        error: () => Swal.fire({
          icon:'error',
          text:'Error while updating the information',
          timer: 1500
        })
      })
    }
  }


}
