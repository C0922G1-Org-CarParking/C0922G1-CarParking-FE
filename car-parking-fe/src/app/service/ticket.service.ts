import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {TicketDtoForList} from "../model/ticket-dto-for-list";
import {TicketType} from "../model/ticket-type";
import {Floor} from "../model/floor";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

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
  }
}
