import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DishInterface } from '../interfaces/dish.interface';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DishService {

  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addDish(dish:DishInterface){
    let url:string = `${this._endPoint}/dish`;
    return this.http.post(url,dish);
  }

  getDishes(pagination:string){
    let url:string = `${this._endPoint}/dish`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }

  deleteDish(id:number){
    let url:string = `${this._endPoint}/dish/${id}`;
    return this.http.delete(url);
  }

  getDish(id:number){
    let url:string = `${this._endPoint}/dish/${id}`;
    return this.http.get(url);
  }

  updateDish(body:DishInterface,id:number){
    let url:string = `${this._endPoint}/dish/${id}`;
    return this.http.patch(url,body);
  }
}
