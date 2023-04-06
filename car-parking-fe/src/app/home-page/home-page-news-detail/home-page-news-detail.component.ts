import {Component, OnInit} from '@angular/core';
import {ParkingNews} from '../../model/parking-news';
import {HttpClient} from '@angular/common/http';
import {ParkingNewsService} from '../../service/parking-news.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-home-page-news-detail',
  templateUrl: './home-page-news-detail.component.html',
  styleUrls: ['./home-page-news-detail.component.css']
})

export class HomePageNewsDetailComponent implements OnInit {
  id?: number;
  parkingNews: ParkingNews;

  constructor(private http: HttpClient,
              private parkingNewsService: ParkingNewsService,
              private activatedRoute: ActivatedRoute,
              private route: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.id = +param.get('id');
    }, error => {
      console.log(error);
    });
    this.parkingNewsService.getDetailParkingNews(this.id).subscribe((item) => {
      this.parkingNews = item;
    }, error => {
      this.route.navigateByUrl('/error');
    });
  }

}
