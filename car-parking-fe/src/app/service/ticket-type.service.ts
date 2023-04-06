import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {TicketType} from "../model/ticket-type";
import {Section} from "../model/section";


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {


  constructor(private http: HttpClient) {
  }
  getAllTicketType():Observable<TicketType[]>{
    return this.http.get<TicketType[]>('http://localhost:8080/ticket/ticketType')
  }

  listTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>('http://localhost:8080/ticket/listTicketType');
  }

  getListSectionById(id: number):Observable<Section[]> {
    debugger
    return this.http.get<Section[]>('http://localhost:8080/ticket/listSection/' + id );
  }
}
