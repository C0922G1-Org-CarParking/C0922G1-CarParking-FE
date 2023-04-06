import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Ticket} from "../model/ticket";
import { Floor } from '../model/floor';
import { TicketType } from '../model/ticket-type';
import { EditTicket } from '../model/edit-ticket';
import { TicketDtoForList } from '../model/ticket-dto-for-list';
import {Observable} from "rxjs";
import {Employee} from "../model/employee";
import {ILocation} from "../model/ilocation";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  URL_GET_PRICE = "http://localhost:8080/ticket/get-price";

  constructor(private http: HttpClient) {
  }

  findByTicketId(ticketId: number): Observable<EditTicket> {
    return this.http.get<EditTicket>('http://localhost:8080/ticket/' + ticketId);
  }

  updateTicket(editTicket: EditTicket) {
    return this.http.put('http://localhost:8080/ticket/update/', editTicket)
  }

  getRenewalPrice(expiryDate: string, effectiveDate: string, rate: number): Observable<any> {
    debugger
    return this.http.get(this.URL_GET_PRICE + "?expiryDate=" + expiryDate + "&effectiveDate="
      + effectiveDate + "&rate=" + rate);
  }
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
      .join('&');
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
  }
  createTicket(ticket: Ticket):Observable<Ticket> {
    debugger
    return this.http.post<Ticket>("http://localhost:8080/ticket/create" , ticket)
  }

  findRateByIdCar(idCar: number) {
    return this.http.get<number>('http://localhost:8080/ticket/rate/' + idCar);
  }

  getPrice(effective: string, expiryDate: string, rate: any) {
    return this.http.get<number>('http://localhost:8080/ticket/getPrice?expiryDate='+expiryDate
      + "&effectiveDate="+effective +"&rate=" +rate);
  }

  getTotalCustomerOfMonth(sinceMonth: number, toMonth: number , year:number):Observable<number[]> {
    debugger
    return this.http.get<number[]>('http://localhost:8080/ticket/statisticalCustomerChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&year=" + year);
  }

  getTotalTicketOfMonth(sinceMonth:number,toMonth:number, year:number):Observable<number[]> {
    return this.http.get<number[]>('http://localhost:8080/ticket/statisticalTicketChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&year=" + year);
  }

  listEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/ticket/listEmployee');
  }

  listFloor():Observable<Floor[]> {
    return this.http.get<Floor[]>('http://localhost:8080/ticket/listFloor');
  }

  listLocation(floorId :number , sectionId: number):Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/ticket/listLocation?floorId=' +floorId +"&sectionId=" +sectionId);
  }
}
