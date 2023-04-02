import {Component, DoCheck, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TokenStorageService} from '../security-authentication/service/token-storage.service';
import {ShareService} from '../security-authentication/service/share.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  currentUser: string;
  nameEmployee: string;
  role: string;
  isLoggedIn = false;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService,
              private router: Router) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.currentUser = this.tokenStorageService.getUser().username;
      this.role = this.tokenStorageService.getUser().roles[0];
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
    this.getUsernameAccount();
  }


  ngOnInit(): void {
    this.loadHeader();
  }

  logOut() {
    this.tokenStorageService.signOut();
    this.shareService.sendClickEvent();
    Swal.fire({
      text: 'Đăng xuất thành công',
      icon: 'success',
      confirmButtonText: 'OK'
    });
    this.router.navigateByUrl('/');
    // cập nhật lại
    location.reload();
  }

  getUsernameAccount() {
    if (this.tokenStorageService.getToken()) {
      this.nameEmployee = this.tokenStorageService.getUser().name;
    }
  }

  //
  // ngOnchanges(): void {
  // }
  //
  // ngOnChanges(changes: SimpleChanges): void {
  //   this.loadHeader();
  // }

}
