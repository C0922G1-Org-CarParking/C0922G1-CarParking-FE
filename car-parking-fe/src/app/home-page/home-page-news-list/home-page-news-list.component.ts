import {Component, OnInit} from '@angular/core';
import {ParkingNews} from '../../model/parking-news';
import {HttpClient} from '@angular/common/http';
import {ParkingNewsService} from '../../service/parking-news.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page-news-list',
  templateUrl: './home-page-news-list.component.html',
  styleUrls: ['./home-page-news-list.component.css']
})
export class HomePageNewsListComponent implements OnInit {
  parkingNews?: ParkingNews[];
  totalPage: number;
  pageNumber = 0;
  keyword = '';

  constructor(private http: HttpClient,
              private parkingNewsService: ParkingNewsService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getParkingNews(this.keyword, this.pageNumber);
  }

  searchParkingNews() {
    this.getParkingNews(this.keyword, 0);
  }


  previousNews() {
    if (this.pageNumber === 0) {
      this.getParkingNews(this.keyword, this.pageNumber);
    } else {
      this.getParkingNews(this.keyword, this.pageNumber - 1);
    }
  }


  nextNews() {
    if (this.pageNumber + 1 === this.totalPage) {
      this.getParkingNews(this.keyword, this.pageNumber);
    } else {
      this.getParkingNews(this.keyword, this.pageNumber + 1);
    }
  }

  getParkingNews(keyword: string, page: number) {
    this.parkingNewsService.getListParkingNews(keyword, page).subscribe((items) => {
      this.parkingNews = items.content;
      this.totalPage = items.totalPages;
      this.pageNumber = items.pageable.pageNumber;
    }, error => {
      this.route.navigateByUrl('/error');
    }); 
  }
}
