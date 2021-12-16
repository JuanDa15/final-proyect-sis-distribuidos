import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CustomerInterface } from '../interfaces/customer.interface';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addCustomer(customer:CustomerInterface){
    let url:string = `${this._endPoint}/customer`;
    return this.http.post(url,customer);
  }

  getCustomers(pagination:string){
    let url:string = `${this._endPoint}/customer`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }
  
  deleteCustomer(id:number){
    let url:string = `${this._endPoint}/customer/${id}`;
    return this.http.delete(url);
  }

  getCustomer(id:number){
    let url:string = `${this._endPoint}/customer/${id}`;
    return this.http.get(url);
  }

  updateCustomer(body:CustomerInterface,id:number){
    let url:string = `${this._endPoint}/customer/${id}`;
    return this.http.patch(url,body);
  }

  filter(field:string,value:string){
    let url:string = `${this._endPoint}/customer`;
    const params = new HttpParams()
      .set(field,value);
    return this.http.get(url,{params});
  }
}
