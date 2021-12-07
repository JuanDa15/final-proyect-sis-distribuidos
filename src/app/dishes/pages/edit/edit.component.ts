import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DishInterface } from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styles: [`
    .example-form {
      min-width: 150px;
      max-width: 500px;
      width: 100%;
    }

    .full-width {
      width: 100%;
    }

    mat-form-field{
      margin-bottom: 1rem;
    }

    .img__container{
      border-radius: .5rem;
      overflow: hidden;
      margin-bottom: 1.3rem;
      max-width: 500px;
      max-height: 300px;
    }

    
    img{
      width: 100%;
    }
  `]
})

export class EditComponent implements OnInit {

  dish!:DishInterface;
  id:number;
  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  img = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(private dishService:DishService,
              private AR: ActivatedRoute,
              private router:Router){
                this.id = 0;
              }


  ngOnInit(): void {
    this.AR.params.subscribe({
      next: ({id}) => this.id = id
    })
    

    this.dishService.getDish(this.id)
      .subscribe({
        next: (val:any) => {
          this.dish = val.data;
          this.name.setValue(this.dish.name);
          this.description.setValue(this.dish.description);
          this.img.setValue(this.dish.img);
        },
        error: () => Swal.fire({
          icon: 'error',
          text: 'Error while getting the information',
          timer: 1500,
          position: 'center'
        })
      })
  }

  onSubmit(){
    let requestBody:DishInterface = {
      name: this.name.value,
      description: this.description.value,
      img: this.img.value
    }

    this.dishService.updateDish(requestBody,this.id)
      .subscribe({
        next: () => {
          Swal.fire({
          icon: 'success',
          text: 'Updated sucessfully',
          timer: 1500,
          position: 'center'
          });
          this.router.navigateByUrl('/dishes/list');
        },
        error: () => Swal.fire({
          icon: 'error',
          text: 'Error while updating',
          timer: 1500,
          position: 'center'
        })
      })


  }

}
