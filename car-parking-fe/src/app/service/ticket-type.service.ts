import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {TicketType} from "../model/ticket-type";
import {Floor} from "../model/floor";
import {Car} from "../model/car";
import {Section} from "../model/section";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {


  constructor(private http: HttpClient) {
  }
<<<<<<< HEAD

  listTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>('http://localhost:8080/ticket/ticketType');
=======
  getAllTicketType():Observable<TicketType[]>{
    return this.http.get<TicketType[]>('http://localhost:8080/api/user/ticket/ticketType')
>>>>>>> origin/car-in-out
  }

  listTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>('http://localhost:8080/api/user/ticket/listFloor');
  }

  getListSectionById(id: number):Observable<Section[]> {
    debugger
    return this.http.get<Section[]>('http://localhost:8080/api/user/ticket/listSection/' + id );
  }
}
