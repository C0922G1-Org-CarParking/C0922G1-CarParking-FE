import {Component, OnInit} from '@angular/core';
import {LoginService} from '../service/login.service';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  message = '';

  constructor(private loginService: LoginService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.view();
  }
  view(): void {
    const element = document.getElementById('login');
    if (element) {
      element.scrollIntoView();
    }
  }


  onSubmit(username: string) {
    this.loginService.forgotPassword(username).subscribe(() => {
      Swal.fire({
        text: 'Mật khẩu đã được gửi về email của bạn. ' +
          'Vui lòng kiểm tra email để lấy mật khẩu đăng nhập!',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      this.router.navigateByUrl('/security/login');
    }, error => {
      this.message = error.error.message;
      if (!this.message) {
        this.message = 'Vui lòng nhập địa chỉ email của bạn!';
      }
    });
  }
}
