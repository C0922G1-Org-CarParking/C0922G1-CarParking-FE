import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from "rxjs";

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private http: HttpClient) {
  }
  getAllSection(floor: number): Observable<any> {
    return this.http.get<any>("http://localhost:8080/section?floor=" + floor);
  }
  getAllSection1(): Observable<any> {
    return this.http.get<any>("http://localhost:8080/section/list");
  }
}
