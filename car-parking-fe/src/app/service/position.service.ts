import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {IPosition} from '../model/iposition';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class PositionService {


  constructor(private http: HttpClient) {
  }
  getAllPosition(): Observable<IPosition[]> {
    return this.http.get<IPosition[]>('http://localhost:8080/api/list-position');
  }
}
