import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { DishInterface } from 'src/app/interfaces/dish.interface';
import { DishService } from 'src/app/services/dish.service';
import { MenuService } from 'src/app/services/menu.service';
import Swal from 'sweetalert2';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-new-menu',
  templateUrl: './new-menu.component.html',
  styleUrls: ['./new-menu.component.scss']
})
export class NewMenuComponent implements OnInit {

  entry!:DishInterface;
  mainCourse!:DishInterface;
  dessert!:DishInterface;

  menuForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    entry: new FormControl('',[Validators.required]),
    main_course: new FormControl('',[Validators.required]),
    dessert: new FormControl('',[Validators.required])
  })
  dishesList:DishInterface[];

  matcher = new MyErrorStateMatcher();

  constructor(private dishesService:DishService,
              private menuService:MenuService,
              private router:Router){
    this.dishesList = [];
  }

  ngOnInit(): void {
    this.dishesService.getDishes('0-9')
      .subscribe({
        next: (val:any) => {
          this.dishesList = val.data;
        }
      })
  }

  addEntry(id:number){
    this.menuForm.get('entry')?.setValue(id);
    this.getDish(id,'entry');
  }

  addMainCourse(id:number){
    this.menuForm.get('main_course')?.setValue(id);
    this.getDish(id,'mainCourse');
  }

  addDessert(id:number){
    this.menuForm.get('dessert')?.setValue(id);
    this.getDish(id,'dessert');
  }

  getDish(id:number,category:string){

    if(category === 'entry'){
      this.dishesService.getDish(id).subscribe({
        next: (val:any) =>{
          this.entry = val.data;
        }
      })
    }else if(category === 'mainCourse'){
      this.dishesService.getDish(id).subscribe({
        next: (val:any) =>{
          this.mainCourse = val.data;
        }
      })
    }else if(category === 'dessert'){
      this.dishesService.getDish(id).subscribe({
        next: (val:any) =>{
          this.dessert = val.data;
        }
      })
    }
    
  }

  onSubmit(){
    if(this.menuForm.valid){
      this.menuService.addMenu(this.menuForm.value)
        .subscribe({
          next: () => {
            Swal.fire({
              icon:'success',
              title:'Created Successfully',
              timer:1500
            });
            this.router.navigateByUrl('menus/list')
          },
          error: () => {
            Swal.fire({
              icon:'error',
              title:'Error while creating the menu',
              timer: 1500
            })
          }
        })
    }
  }
}
