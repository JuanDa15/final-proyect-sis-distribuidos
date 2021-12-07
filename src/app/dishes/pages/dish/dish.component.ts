import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Dish } from 'src/app/models/dish.model';
import { DishInterface } from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styles: [`
    .example-form {
      min-width: 150px;
      max-width: 500px;
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
export class DishComponent{

  dishForm = new FormGroup({
    name : new FormControl('', [Validators.required]),
    description : new FormControl('', [Validators.required]),
    img:  new FormControl('', [Validators.required])
  })

  matcher = new MyErrorStateMatcher();



  constructor(private dishService:DishService,
              private router:Router){}

  onSubmit(){
    if(this.dishForm.valid){
      
      let bodyRequest:DishInterface = new Dish(
        this.dishForm.get('name')?.value,
        this.dishForm.get('description')?.value,
        this.dishForm.get('img')?.value
      )

      this.dishService.addDish(bodyRequest)
          .subscribe({
            next: () => {
              Swal.fire({
              text: "Plato creado correctamente",
              icon: "success",
              timer: 1500,
              position: 'center'
            });
            this.router.navigateByUrl('/dishes/list');
          },
            error: (err) => Swal.fire({
              icon:'error',
              timer:1500,
              position: 'center',
              text: `${err.error.detailed}`
            })
          })
    }
  }


}
