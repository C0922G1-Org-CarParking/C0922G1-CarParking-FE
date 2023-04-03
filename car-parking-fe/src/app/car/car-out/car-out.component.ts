import {Component, OnInit} from '@angular/core';
import {ICarInOut} from '../../model/i-car-in-out';
import {CarInOutService} from '../../service/car-in-out.service';
import {CarInOut} from '../../model/car-in-out';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-car-out',
  templateUrl: './car-out.component.html',
  styleUrls: ['./car-out.component.css']
})
export class CarOutComponent implements OnInit {
  carOut: ICarInOut;
  plateNumberImage?: File;
  timeOut?: any;
  now: any;
  urlCarOutImage: string;

  constructor(private carInOutService: CarInOutService,
              private router: Router,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
  }

  onUpload(event) {
    this.plateNumberImage = event.target.files[0];
    const imageFormData = new FormData();
    imageFormData.append('plateNumberImage', this.plateNumberImage, this.plateNumberImage.name);
    if (this.plateNumberImage != null) {
      const filePath = this.plateNumberImage.name;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.plateNumberImage).snapshotChanges().pipe(
        finalize(() => (fileRef.getDownloadURL().subscribe(url => {
          this.urlCarOutImage = url;
          console.log('Đây là đường dẫn ' + this.urlCarOutImage);
        })))
      ).subscribe();
    }
    this.carInOutService.searchCarOutByScanning(imageFormData).subscribe(carOut => {
      this.carOut = carOut;
      const options = {
        timeZone: 'Asia/Ho_Chi_Minh',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: false
      };
      // carOut.timeIn = localDate.toLocaleString('vi-VN', options);
      const now = new Date();
      this.timeOut = now.toLocaleString('vi-VN', options);
      console.log(carOut);
    }, error => {
      // car not existing in database
      if (error.status === 404) {
        Swal.fire({
          title: 'Không tìm thấy xe',
          text: 'Vé đã hết hạn, vui lòng liên hệ phòng vé để bổ sung phí hoặc gia hạn vé!',
          icon: 'question',
          confirmButtonText: 'Xác nhận'
        });
      }
      // the system is not able to scan the image
      if (error.status === 406) {
        Swal.fire({
          title: 'Không quét được biển số',
          text: 'Vui lòng ấn vào tìm xe',
          icon: 'question',
          confirmButtonText: 'Xác nhận'
        });
      }
      // the system error
      if (error.status === 500) {
        Swal.fire({
          title: 'Lỗi hệ thống',
          text: 'Không nhận được file hoặc hệ thống trục trặc, vui lòng thử cách khác!',
          icon: 'error',
          confirmButtonText: 'Xác nhận'
        });
      }
    });
  }

  saveCarOut() {
    // car's data is not found
    if (this.carOut == null) {
      let timerInterval;
      Swal.fire({
        title: 'Vui lòng tìm dữ liệu xe!',
        html: 'Tự động đóng trong <b></b> ms.',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector('b');
          timerInterval = setInterval(() => {
            b.textContent = String(Swal.getTimerLeft());
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        }
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log('I was closed by the timer');
        }
      });
      return;
    }
    const carOut = {
      id: this.carOut.carInOutId,
      timeOut: this.timeOut,
      urlCarOutImage: this.urlCarOutImage
    };
    console.log(carOut);
    this.carInOutService.saveCarOut(carOut).subscribe(() => {
      Swal.fire({
        title: 'Lưu thành công!',
        text: 'Xin mời xe ra',
        icon: 'success',
        confirmButtonText: 'Xác nhận'
      });
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }, error => {
    });
  }
}
