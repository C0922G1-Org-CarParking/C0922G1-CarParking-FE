import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ILocation} from '../model/ilocation';
// @ts-ignore
import {Page} from 'ngx-pagination/dist/pagination-controls.directive';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getAllLocation(search: string, page: number): Observable<Page> {
    // alert(search)
    return this.http.get<Page>('http://localhost:8080/location/list?search=' + search + '&page=' + page);
  }

  deleteLocation(id: number): Observable<Page> {
    return this.http.delete<Page>('http://localhost:8080/location/delete/' + id);
  }
}
export interface Page<T> {
  content: T[];
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
    };
    pageNumber: number;
    pageSize: number;
    offset: number;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
