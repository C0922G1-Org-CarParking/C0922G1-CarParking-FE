import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";
import {EditTicket} from "../model/edit-ticket";
import {Updateticket} from "../model/updateticket";
import {ILocation} from "../model/ilocation";
import {Floor} from "../model/floor";
import {UpdateTicket} from "../model/update-ticket";
import {Section} from "../model/section";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  URL_GET_PRICE = "http://localhost:8080/ticket/get-price";

  constructor(private http: HttpClient) {
  }

  findByTicketId(ticketId: number): Observable<EditTicket> {
    debugger
    return this.http.get<EditTicket>('http://localhost:8080/ticket/edit/' + ticketId);
  }

  // updateTicket(editTicket: EditTicket, id: number) {
  //
  //   return this.http.put('http://localhost:8080/ticket/update/' + id, editTicket)
  // }
  updateTicketType(editTicket: UpdateTicket) {
  debugger
    return this.http.put('http://localhost:8080/ticket/update' , editTicket)
  }

  getPrice(expiryDate: string,effective: string, rate: any) {
    return this.http.get<number>('http://localhost:8080/ticket/getPrice?expiryDate=' + expiryDate
      + "&effectiveDate=" + effective + "&rate=" + rate);
  }

  findSectionByFloor(idFloor: number): Observable<ILocation[]> {
    debugger
    return this.http.get<ILocation[]>('http://localhost:8080/ticket/findLocation/' + idFloor);
  }

  findLocationByFloor(idFloor: number): Observable<ILocation[]> {
    debugger
    return this.http.get<ILocation[]>('http://localhost:8080/ticket/findLocation/' + idFloor);
  }

  getListFloor(): Observable<Floor[]> {
    return this.http.get<Floor[]>('http://localhost:8080/ticket/listFloor')
  }

  listSectionById(id: number):Observable<Section[]> {
    return this.http.get<Section[]>('http://localhost:8080/ticket/listSection/' + id );
  }

  listLocation(floorId :number , sectionId: number):Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/ticket/listLocation?floorId=' +floorId +"&sectionId=" +sectionId);
  }
}
