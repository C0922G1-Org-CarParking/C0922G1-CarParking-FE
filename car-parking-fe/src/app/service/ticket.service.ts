import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
<<<<<<< HEAD
import {Observable} from "rxjs";
import {TicketDtoForList} from "../model/ticket-dto-for-list";
import {TicketType} from "../model/ticket-type";
import {Floor} from "../model/floor";
=======
import {Ticket} from "../model/ticket";
import {Customer} from "../model/customer";
import {Observable} from "rxjs";
import {Tick} from "chart.js";
import {Car} from "../model/car";
>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) {
  }

<<<<<<< HEAD
  searchTicket(customerName?: string,
               customerPhone?: string,
               employeeName?: string,
               employeePhone?: string,
               floor?: string,
               expiryDate?: string,
               ticketType?: string,
               status?: number,
               page?: number): Observable<any> {

    const params = {
      customerName,
      customerPhone,
      employeeName,
      employeePhone,
      floor,
      expiryDate,
      ticketType,
      status,
      page
    };
    const query = Object.entries(params)
      .filter(([_, value]) => value !== undefined && value !== null)
      .map(([key, value]) => `${key}=${value}`)
      .join('&&');
    debugger
    return this.http.get<any>(`http://localhost:8080/ticket/search?${query}`);
  }

  findById(id: number): Observable<TicketDtoForList> {
    return this.http.get<TicketDtoForList>(`http://localhost:8080/ticket/detail/${id}`);
  }

  findAllTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`http://localhost:8080/ticket/ticketType`)
  }

  findAllFloor(): Observable<Floor[]> {
    return this.http.get<Floor[]>(`http://localhost:8080/ticket/floor`)
  }

  deleteTicket(idDelete: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/ticket/delete/${idDelete}`)
=======
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


>>>>>>> fb78b61370be32eeaa372c8e3ca67b7e7393aaee
  }
}
