import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EmployeeInterface } from '../interfaces/employee.interface';
import { ReservationInterface } from '../interfaces/reservation.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private _endPoint:string = environment.URL;

  constructor(private http:HttpClient) { }

  addReservation(reservation:ReservationInterface){
    let url:string = `${this._endPoint}/reservation`;
    return this.http.post(url,reservation);
  }

  getReservations(pagination:string){
    let url:string = `${this._endPoint}/reservation`;
    const headers = new HttpHeaders()
      .set('range',pagination);
    return this.http.get(url,{headers:headers});
  }
  
  deleteReservations(id:number){
    let url:string = `${this._endPoint}/reservation/${id}`;
    return this.http.delete(url);
  }

  getReservation(id:number){
    let url:string = `${this._endPoint}/reservation/${id}`;
    return this.http.get(url);
  }

  updateReservation(body:ReservationInterface,id:number){
    let url:string = `${this._endPoint}/reservation/${id}`;
    return this.http.patch(url,body);
  }
}
