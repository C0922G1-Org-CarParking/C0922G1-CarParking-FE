import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from "rxjs";
import {Floor} from "../model/floor";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor(private http: HttpClient) {
  }

  getAllFloor(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/floor");

  }


  listFloor():Observable<Floor[]> {
    return this.http.get<Floor[]>('http://localhost:8080/ticket/listFloor');
  }


}
