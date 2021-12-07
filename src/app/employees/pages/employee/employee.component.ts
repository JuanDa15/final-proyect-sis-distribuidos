import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class EmployeeComponent implements OnInit {

  id:number;
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


  constructor(private AR:ActivatedRoute,
              private router:Router,
              private employeeService:EmployeeService) {
    this.id = 0;
  }

  ngOnInit(): void {
    this.AR.params.subscribe({
      next: ({id}) => this.id = id
    })
    this.employeeService.getEmployee(this.id).subscribe({
      next: (val:any) => this.employeeForm.patchValue(val.data)
    })
  }

  onSubmit(){
    if(this.employeeForm.valid){
      this.employeeService.updateEmployee(this.employeeForm.value,this.id).subscribe({
        next: () => {
          Swal.fire({
            icon:'success',
            text:'Updated Successfully',
            timer: 1500,
          });
          this.router.navigateByUrl('/employees/list');
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
