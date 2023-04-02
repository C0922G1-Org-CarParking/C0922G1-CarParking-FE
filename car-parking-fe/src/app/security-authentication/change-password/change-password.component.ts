import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../service/token-storage.service';
import {FormControl, FormGroup} from '@angular/forms';
import {LoginService} from '../service/login.service';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {ShareService} from '../service/share.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  formChangePassword: FormGroup;
  username: string;
  message: '';

  constructor(private tokenStorageService: TokenStorageService,
              private loginService: LoginService,
              private router: Router,
              private shareService: ShareService) {
  }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
      this.formChangePassword = new FormGroup({
        username: new FormControl(this.username),
        password: new FormControl(),
        newPassword: new FormControl(),
        confirmNewPassword: new FormControl()
      });
    } else {
      this.errorAuth();
    }
  }

  errorAuth() {
    Swal.fire({
      text: 'Bạn cần phải đăng nhập!',
      icon: 'warning',
      confirmButtonText: 'OK'
    });
    this.router.navigateByUrl('/security/login');
  }

  onSubmit() {
    this.loginService.changePassword(this.formChangePassword.value).subscribe(() => {
      Swal.fire({
        text: 'Đổi mật khẩu thành công!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.shareService.sendClickEvent();
      this.router.navigateByUrl('/');
    }, error => {
      // this.message = error.error.message;
      Swal.fire({
        text: 'Mật khẩu cũ không đúng hoặc mật khẩu mới chưa hợp lệ!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    });
  }

}
