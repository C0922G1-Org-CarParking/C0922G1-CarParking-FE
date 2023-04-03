import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ICarInOut} from '../model/i-car-in-out';
import {Observable} from 'rxjs';
import {CarInOut} from '../model/car-in-out';


const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CarInOutService {
  URL_SCANNING_CAR_IN = 'http://localhost:8080/car-in-out/scanning-car-in';
  URL_SAVE_CAR_IN = 'http://localhost:8080/car-in-out/save-car-in';
  URL_SCANNING_CAR_OUT = 'http://localhost:8080/car-in-out/scanning-car-out';
  URL_SAVE_CAR_OUT = 'http://localhost:8080/car-in-out/save-car-out';

  constructor(private http: HttpClient) {
  }

  searchCarInByScanning(imageFormData: FormData): Observable<ICarInOut> {
    return this.http.post<ICarInOut>(this.URL_SCANNING_CAR_IN, imageFormData);
  }

  saveCarIn(savedCarIn): Observable<any> {
    return this.http.post<any>(this.URL_SAVE_CAR_IN, savedCarIn);
  }

  searchCarOutByScanning(imageFormData: FormData): Observable<ICarInOut> {
    return this.http.post<ICarInOut>(this.URL_SCANNING_CAR_OUT, imageFormData);
  }

  saveCarOut(carOut): Observable<ICarInOut> {
    return this.http.post<ICarInOut>(this.URL_SAVE_CAR_OUT, carOut);
  }

}
