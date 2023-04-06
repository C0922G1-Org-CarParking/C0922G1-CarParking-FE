import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PageJson} from '../model/page-json';
import {ParkingNews} from '../model/parking-news';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class ParkingNewsService {

  constructor(private http: HttpClient) {
  }

  getListParkingNews(keyword: string, pageNumber: number): Observable<PageJson> {
    return this.http.get<any>(`${API_URL}/api/public/parking_news?page=` + pageNumber + '&keyword=' + keyword);
  }

  getDetailParkingNews(id: number): Observable<ParkingNews> {
    return this.http.get<ParkingNews>(`${API_URL}/api/public/parking_news/detail/${id}`);
  }
}
