import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {EditTicket} from "../model/edit-ticket";

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
}
