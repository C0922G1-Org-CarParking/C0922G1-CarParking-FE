import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CarType} from '../model/car-type';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CarTypeService {

  constructor(private http: HttpClient) {
  }

  getAllCarType(): Observable<CarType[]> {
    return this.http.get<CarType[]>('http://localhost:8080/api/user/customer/carType');
  }
}
