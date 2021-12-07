import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { supplierInterface } from '../interfaces/supplier.interface';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addSupplier(supplier:supplierInterface){
    let url:string = `${this._endPoint}/suppliers`;
    return this.http.post(url,supplier);
  }

  getSuppliers(pagination:string){
    let url:string = `${this._endPoint}/suppliers`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }
  
  deleteSupplier(id:number){
    let url:string = `${this._endPoint}/suppliers/${id}`;
    return this.http.delete(url);
  }

  getSupplier(id:number){
    let url:string = `${this._endPoint}/suppliers/${id}`;
    return this.http.get(url);
  }

  updateSupplier(body:supplierInterface,id:number){
    let url:string = `${this._endPoint}/suppliers/${id}`;
    return this.http.patch(url,body);
  }
}
