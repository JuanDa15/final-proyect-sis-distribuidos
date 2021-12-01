import { Component } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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
export class DishComponent{

  name = new FormControl('', [Validators.required]);
  description = new FormControl('', [Validators.required]);
  url = new FormControl('', [Validators.required]);

  matcher = new MyErrorStateMatcher();

  constructor(){}

  onSubmit(){
    console.log(this.name.value,this.description.value);
  }

}
