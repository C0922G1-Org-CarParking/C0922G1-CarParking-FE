import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {EditTicket} from "../model/edit-ticket";
import {TicketDtoForList} from "../model/ticket-dto-for-list";
import {TicketType} from "../model/ticket-type";
import {Floor} from "../model/floor";
import {Ticket} from "../model/ticket";
import {ILocation} from "../model/ilocation";
import {Section} from "../model/section";
import {UpdateTicket} from "../model/update-ticket";
import {Employee} from "../model/employee";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  URL_GET_PRICE = "http://localhost:8080/api/user/ticket/get-price";

  constructor(private http: HttpClient) {
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
    return this.http.get<any>(`http://localhost:8080/api/user/ticket/search?${query}`);
  }

  findById(id: number): Observable<TicketDtoForList> {
    return this.http.get<TicketDtoForList>(`http://localhost:8080/api/user/ticket/detail/${id}`);
  }

  findAllTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>(`http://localhost:8080/api/user/ticket/ticketType`)
  }

  findAllFloor(): Observable<Floor[]> {
    return this.http.get<Floor[]>(`http://localhost:8080/api/user/ticket/floor`)
  }

  deleteTicket(idDelete: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/api/user/ticket/delete/${idDelete}`)
  }

  createTicket(ticket: Ticket):Observable<Ticket> {

    return this.http.post<Ticket>("http://localhost:8080/api/user/ticket/createTicket" , ticket)
  }

  findRateByIdCar(idCar: number) {
    return this.http.get<number>('http://localhost:8080/api/user/ticket/rate/' + idCar);
  }

  getPrice(effective: string, expiryDate: string, rate: any) {

    return this.http.get<number>('http://localhost:8080/api/user/ticket/getPrice?expiryDate='+expiryDate
      + "&effectiveDate="+effective +"&rate=" +rate);
  }
  findByTicketId(ticketId: number): Observable<EditTicket> {
    return this.http.get<EditTicket>('http://localhost:8080/api/user/ticket/edit/' + ticketId);
  }
  //
  // updateTicket(editTicket: EditTicket) {
  //   return this.http.put('http://localhost:8080/api/user/ticket/update/', editTicket)
  // }

  getRenewalPrice(expiryDate: string, effectiveDate: string, rate: number): Observable<any> {
    return this.http.get(this.URL_GET_PRICE + "?expiryDate=" + expiryDate + "&effectiveDate="
      + effectiveDate + "&rate=" + rate);
  }

  ///
  // updateTicket(editTicket: EditTicket, id: number) {
  //
  //   return this.http.put('http://localhost:8080/ticket/update/' + id, editTicket)
  // }
  updateTicketType(editTicket: UpdateTicket) {
    return this.http.put('http://localhost:8080/api/user/ticket/update' , editTicket)
  }

  findSectionByFloor(idFloor: number): Observable<ILocation[]> {
    debugger
    return this.http.get<ILocation[]>('http://localhost:8080/api/user/ticket/findLocation/' + idFloor);
  }

  findLocationByFloor(idFloor: number): Observable<ILocation[]> {
    debugger
    return this.http.get<ILocation[]>('http://localhost:8080/api/user/ticket/findLocation/' + idFloor);
  }

  getListFloor(): Observable<Floor[]> {
    return this.http.get<Floor[]>('http://localhost:8080/api/user/ticket/listFloor')
  }

  listSectionById(id: number):Observable<Section[]> {
    return this.http.get<Section[]>('http://localhost:8080/api/user/ticket/listSection/' + id );
  }

  listLocation(floorId :number , sectionId: number):Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/api/user/ticket/listLocation?floorId=' +floorId +"&sectionId=" +sectionId);
  }

  getTotalCustomerOfMonth(sinceMonth: number, toMonth: number , year:number):Observable<number[]> {
    debugger
    return this.http.get<number[]>('http://localhost:8080/api/user/ticket/statisticalCustomerChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&year=" + year);
  }

  getTotalTicketOfMonth(sinceMonth:number,toMonth:number, year:number):Observable<number[]> {
    return this.http.get<number[]>('http://localhost:8080/api/user/ticket/statisticalTicketChart?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&year=" + year);
  }

  listEmployee(): Observable<Employee[]> {
    return this.http.get<Employee[]>('http://localhost:8080/api/user/ticket/listEmployee');
  }

  listFloor():Observable<Floor[]> {
    return this.http.get<Floor[]>('http://localhost:8080/api/user/ticket/listFloor');
  }


// ---------- huyNV up------

  getTotalCustomerOfMonthOfRange(sinceMonth: number, toMonth: number, yearStart: number, yearEnd: number) {
    return this.http.get<number[]>('http://localhost:8080/api/user/ticket/statisticalCustomerChartRange?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&yearStart=" + yearStart + "&yearEnd=" + yearEnd);
  }

  getTotalTicketOfMonthOfRange(sinceMonth: number, toMonth: number, yearStart: number, yearEnd: number) {
    return this.http.get<number[]>('http://localhost:8080/api/user/ticket/statisticalTicketChartRange?sinceMonth='+sinceMonth
      + "&toMonth="+toMonth +"&yearStart=" + yearStart + "&yearEnd=" + yearEnd);
  }
}
