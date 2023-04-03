import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Employee} from "../model/employee";
import {Observable} from "rxjs";
import {ILocation} from "../model/ilocation";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  listLocation():Observable<ILocation[]> {
    return this.http.get<ILocation[]>('http://localhost:8080/ticket/listLocation');
  }
}
