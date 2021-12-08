import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'calendar-utils';
import { startOfDay } from 'date-fns';
import { ReservationInterface } from 'src/app/interfaces/reservation.interface';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  reservationsList:ReservationInterface[] = [];
  viewDate = new Date();
  @Input() set reservations(reservationsList:ReservationInterface[]){
    this.events = [];
    this.reservationsList = reservationsList;
    this.getReservations()
  }
  events: CalendarEvent[] = [];

  constructor(private reservationService:ReservationService) {
  }

  ngOnInit(): void {
  }

  getReservations(){
    for(let x of this.reservationsList)
    {
      this.events = [
                ...this.events,
                {
                  start:new Date(x.date),
                  title:x.owner+ "-id: " +x.document+"-table: "+x.table
                }
        ]
    }
  }

}
