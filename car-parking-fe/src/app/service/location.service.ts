import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ILocation} from '../model/ilocation';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }
  createLocation(location: ILocation) {
    return this.http.post('http://localhost:8080/location/create', location);
  }
  editLocation(id: number, location: Location): Observable<any> {
    return this.http.patch<any>('http://localhost:8080/location/edit/' + id, location);
  }
  findLocationById(id): Observable<ILocation> {
    return this.http.get<ILocation>('http://localhost:8080/location/' + id);
  }
  getAll(id): Observable<any> {
    return this.http.get<any>('http://localhost:8080/location/info/' + id);
  }
}
