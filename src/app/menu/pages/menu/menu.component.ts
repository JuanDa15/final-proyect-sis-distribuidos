import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
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
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  entry!:DishInterface;
  mainCourse!:DishInterface;
  dessert!:DishInterface;
  id:number;

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
              private router:Router,
              private AR:ActivatedRoute){
    this.dishesList = [];
    this.id = 0;
  }

  ngOnInit(): void {
    this.AR.params.pipe(
      switchMap( resp => {
        this.id = resp.id;
        return this.menuService.getMenu(resp.id);
      })
    ).subscribe({
      next: (val:any) => {
        this.menuForm.get('name')?.patchValue(val.data.name);
        this.menuForm.get('entry')?.patchValue(val.data.entry.id);
        this.menuForm.get('main_course')?.patchValue(val.data.main_course.id);
        this.menuForm.get('dessert')?.patchValue(val.data.dessert.id);
        this.getDish(val.data.entry.id,'entry');
        this.getDish(val.data.main_course.id,'mainCourse');
        this.getDish(val.data.dessert.id,'dessert');
      }  
    })

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
      this.menuService.updateMenu(this.menuForm.value, this.id)
        .subscribe({
          next: () => {
            Swal.fire({
              icon:'success',
              title:'Updated Successfully',
              timer:1500
            });
            this.router.navigateByUrl('/menus/list')
          },
          error: () => {
            Swal.fire({
              icon:'error',
              title:'Error while updating the menu',
              timer: 1500
            })
          }
        })
    }
  }

}
