import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {TicketType} from "../model/ticket-type";
import {Floor} from "../model/floor";
import {Car} from "../model/car";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketTypeService {


  constructor(private http: HttpClient) {
  }

  listTicketType(): Observable<TicketType[]> {
    return this.http.get<TicketType[]>('http://localhost:8080/ticket/listFloor');
  }

}
