import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Ticket} from "../model/ticket";
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

  createTicket(ticket: Ticket):Observable<Ticket> {
    debugger
    return this.http.post<Ticket>("http://localhost:8080/ticket/createTicket" , ticket)
  }

  findRateByIdCar(idCar: number) {
    return this.http.get<number>('http://localhost:8080/ticket/rate/' + idCar);
  }

  getPrice(effective: string, expiryDate: string, rate: any) {
    return this.http.get<number>('http://localhost:8080/ticket/getPrice?expiryDate='+expiryDate
      + "&effectiveDate="+effective +"&rate=" +rate);
  }

  getTotalTicketOfMonth(sinceMonth:number,toMonth:number):Observable<number[]> {
    return this.http.get<number[]>('http://localhost:8080/ticket/statisticalTicketChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth);
  }

  getTotalCustomerOfMonth(sinceMonth: number, toMonth: number):Observable<number[]> {
    debugger
    return this.http.get<number[]>('http://localhost:8080/ticket/statisticalCustomerChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth);
  }
}
