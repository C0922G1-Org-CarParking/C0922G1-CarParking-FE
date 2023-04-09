import {Component, OnInit} from '@angular/core';
import {ParkingNews} from '../../model/parking-news';
import {HttpClient} from '@angular/common/http';
import {ParkingNewsService} from '../../service/parking-news.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home-page-news-detail',
  templateUrl: './home-page-news-detail.component.html',
  styleUrls: ['./home-page-news-detail.component.css']
})

export class HomePageNewsDetailComponent implements OnInit {
  id?: number;
  parkingNews?: ParkingNews;
  currentPage?: number;
  keyword?: string;
  mess?: string

  constructor(private http: HttpClient,
              private parkingNewsService: ParkingNewsService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = +param.get('id');
      this.currentPage = + param.get('currentPage') === null ? 0 : + param.get('currentPage');
      this.keyword = param.get('keyword')=== null ? '' : param.get('keyword');
    });
    this.parkingNewsService.getDetailParkingNews(this.id).subscribe((item) => {
      this.parkingNews = item;
    }, () => {
        this.mess = 'Thông tin này hiện không tồn tại. Vui lòng về lại trang chủ.';
    });
  }

}
