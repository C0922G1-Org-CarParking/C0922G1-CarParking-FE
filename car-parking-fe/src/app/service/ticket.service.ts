import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Ticket} from "../model/ticket";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";
import {Tick} from "chart.js";
import {Car} from "../model/car";

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

  statisticalTicket(sinceMonth: number, toMonth: number):Observable<[]> {
    return this.http.get<[]>("http://localhost:8080/ticket/statisticalTicketChart/" + sinceMonth + "/" + toMonth)
  }

  statisticalCustomer(sinceMonth: number, toMonth: number):Observable<[]> {
    return this.http.get<[]>("http://localhost:8080/ticket/statisticalCustomerChart/" + sinceMonth + "/" + toMonth)
  }

  displayMoth(sinceMonth: number, toMonth: number):Observable<[]> {
    return this.http.get<[]>("http://localhost:8080/ticket/displayMonth/" + sinceMonth + "/" + toMonth);
  }

  findRateByIdCar(idCar: number) {
    return this.http.get<number>('http://localhost:8080/ticket/rate/' + idCar);
  }

  getPrice(effective: string, expiryDate: string, rate: any) {
    debugger
    return this.http.get<number>('http://localhost:8080/ticket/getPrice?expiryDate='+expiryDate
      + "&effectiveDate="+effective +"&rate=" +rate);
  }

  getTotalTicketOfMonth(month: number) {


  }
}
