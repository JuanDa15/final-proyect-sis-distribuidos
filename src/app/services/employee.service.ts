import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeInterface } from '../interfaces/employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addEmployee(dish:EmployeeInterface){
    let url:string = `${this._endPoint}/employee`;
    return this.http.post(url,dish);
  }

  getEmployees(pagination:string){
    let url:string = `${this._endPoint}/employee`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }
  
  deleteEmployee(id:number){
    let url:string = `${this._endPoint}/employee/${id}`;
    return this.http.delete(url);
  }

  getEmployee(id:number){
    let url:string = `${this._endPoint}/employee/${id}`;
    return this.http.get(url);
  }

  updateEmployee(body:EmployeeInterface,id:number){
    let url:string = `${this._endPoint}/employee/${id}`;
    return this.http.patch(url,body);
  }
}
