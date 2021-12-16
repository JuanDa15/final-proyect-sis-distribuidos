import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { supplierInterface } from '../interfaces/supplier.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addMenu(supplier:supplierInterface){
    let url:string = `${this._endPoint}/menu`;
    return this.http.post(url,supplier);
  }

  getMenus(pagination:string){
    let url:string = `${this._endPoint}/menu`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }
  
  deleteMenu(id:number){
    let url:string = `${this._endPoint}/menu/${id}`;
    return this.http.delete(url);
  }

  getMenu(id:number){
    let url:string = `${this._endPoint}/menu/${id}`;
    return this.http.get(url);
  }

  updateMenu(body:supplierInterface,id:number){
    let url:string = `${this._endPoint}/menu/${id}`;
    return this.http.patch(url,body);
  }

  filter(field:string,value:string){
    let url:string = `${this._endPoint}/menu`;

    const params = new HttpParams()
      .set(field,value);

    return this.http.get(url,{params});
  }
}
