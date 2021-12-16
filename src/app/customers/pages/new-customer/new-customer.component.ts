import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import Swal from 'sweetalert2';

interface DocType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent{

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

  constructor(private customerService:CustomerService,
              private router:Router) { }

  onSubmit(){
    if(this.customerForm.valid){
      this.customerService.addCustomer(this.customerForm.value)
        .subscribe({
          next: () => {
            Swal.fire({
              icon:'success',
              text:'Successfully added',
              timer: 1500,
              position: 'center'
            });
            this.router.navigateByUrl('customers/list');
          },
          error: (err) => console.log(err)
        })
    }
  }

}
