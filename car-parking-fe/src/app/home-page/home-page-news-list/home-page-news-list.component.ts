import {Component, OnInit} from '@angular/core';
import {ParkingNews} from '../../model/parking-news';
import {HttpClient} from '@angular/common/http';
import {ParkingNewsService} from '../../service/parking-news.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-home-page-news-list',
  templateUrl: './home-page-news-list.component.html',
  styleUrls: ['./home-page-news-list.component.css']
})

export class HomePageNewsListComponent implements OnInit {
  parkingNews?: ParkingNews[];
  keyword = '';
  pageCount = 0;
  pageNumbers: number[] = [];
  totalPages = 0;
  currentPage = 0;
  pageToDisplay: (number | string)[];
  mess = '';

  constructor(private http: HttpClient,
              private parkingNewsService: ParkingNewsService,
              private route: Router) {
  }

  ngOnInit(): void {
    this.getParkingNews();
  }

  getParkingNews() {
    this.mess = '';
    this.parkingNewsService.getListParkingNews(this.keyword, this.currentPage).subscribe((items) => {
     if(items === null) {
       this.mess = 'Không tìm thấy tin tức có từ khóa: ' + this.keyword;
       this.parkingNews = null;
       this.pageToDisplay = null;
     }
      this.parkingNews = items.content;
      this.pageCount = items.totalPages;
      this.currentPage = items.pageable.pageNumber;
    }, error => {
      this.route.navigateByUrl('/error');
    }, () => {
      this.pageToDisplay = this.pageNumbersToDisplay;
    });
  }

  searchNews() {
    this.currentPage = 0;
    this.getParkingNews();
  }

  getAllNews() {
    this.keyword = '';
    this.currentPage = 0;
    this.getParkingNews();
  }

  get pageNumbersToDisplay() {
    const currentPageIndex = this.currentPage;
    const totalPageCount = this.pageCount;
    const pagesToShow = 3;

    if (totalPageCount <= pagesToShow) {
      return Array.from({ length: totalPageCount }, (_, i) => i + 1);
    }

    const startPage = Math.max(0, currentPageIndex - Math.floor(pagesToShow / 2));
    let endPage = startPage + pagesToShow - 1;

    if (endPage >= totalPageCount) {
      endPage = totalPageCount - 1;
    }

    let pageNumbersToDisplay: (number | string)[] = Array.from({ length: endPage - startPage + 1 }, (_, i) => i + startPage + 1);

    if (startPage > 0) {
      pageNumbersToDisplay = [ '...', ...pageNumbersToDisplay];
    }

    if (endPage < totalPageCount - 1) {
      pageNumbersToDisplay = [...pageNumbersToDisplay, '...'];
    }

    return pageNumbersToDisplay;
  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
    this.getParkingNews();
  }

  nextPage() {
    if (this.currentPage < this.pageCount - 1) {
      this.currentPage++;
    }
    this.getParkingNews();
  }

  goToPage(pageNumber: number | string) {
    if (typeof pageNumber === 'number') {
      this.currentPage = pageNumber - 1;
    }
    this.getParkingNews();
  }

}
