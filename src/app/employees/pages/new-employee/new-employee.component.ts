import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import Swal from 'sweetalert2';

interface DocType {
  value: string;
  viewValue: string;
}

interface ChargeType {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.scss']
})
export class NewEmployeeComponent{

  employeeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    charge: new FormControl('',[Validators.required]),
    document_type: new FormControl('',[Validators.required]),
    document: new FormControl('',[Validators.required])
  })

  documentTypes: DocType[] = [
    {value: 'C.C.', viewValue: 'Cedula Ciudadania'},
    {value: 'C.E.', viewValue: 'Cedula Extranjeria'},
    {value: 'Passport', viewValue: 'Pasaporte'}
  ];

  chargeTypes:ChargeType[] = [
    {value:"Manager",viewValue:"Manager"},
    {value:"Bartender",viewValue:"Bartender"},
    {value:"Host",viewValue:"Host"},
    {value:"Server",viewValue:"Server"},
    {value:"Busser",viewValue:"Busser"},
    {value:"Runner",viewValue:"Runner"},
    {value:"Cashier",viewValue:"Cashier"}
  ]

  constructor(private employeeService:EmployeeService,
              private router:Router) { }

  onSubmit(){
    if(this.employeeForm.valid){
      this.employeeService.addEmployee(this.employeeForm.value)
        .subscribe({
          next: () => {
            Swal.fire({
              icon:'success',
              text:'Successfully added',
              timer: 1500,
              position: 'center'
            });
            this.router.navigateByUrl('employees/list');
          },
          error: (err) => console.log(err)
        })
    }
  }
}
