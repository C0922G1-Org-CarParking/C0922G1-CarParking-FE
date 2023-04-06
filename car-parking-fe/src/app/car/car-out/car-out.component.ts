import {Component, OnInit} from '@angular/core';
import {ICarInOut} from '../../model/i-car-in-out';
import {CarInOutService} from '../../service/car-in-out.service';
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
  timeOut = '';
  now: any;
  urlCarOutImage = '../../../../assets/car-images/default.png';
  dataList: ICarInOut[];
  public listEmpty: string;

  constructor(private carInOutService: CarInOutService,
              private router: Router,
              private storage: AngularFireStorage) {
  }


  ngOnInit(): void {
    this.searchCarOut('', '', '');
  }

  onUpload(event) {
    this.plateNumberImage = event.target.files[0];
    const allowedFileTypes = ['image/jpeg', 'image/png'];
    if (allowedFileTypes.indexOf(this.plateNumberImage.type) === -1) {
      Swal.fire({
        title: 'Tập tin không hợp lệ',
        text: 'Vui lòng tải lại file ảnh đuôi .jpg hoặc .png',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'darkorange'
      });
      return;
    }

    const imageFormData = new FormData();
    imageFormData.append('plateNumberImage', this.plateNumberImage, this.plateNumberImage.name);
    if (this.plateNumberImage != null) {
      const filePath = this.plateNumberImage.name;
      const fileRef = this.storage.ref(filePath);
      this.carInOutService.searchCarOutByScanning(imageFormData).subscribe(carOut => {
        this.carOut = carOut;
        const options2 = {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour12: false
        };
        let effectiveDate = new Date(this.carOut.ticketEffectiveDate).toLocaleString('vi-VN', options2);
        let expiryDate = new Date(this.carOut.ticketExpiryDate).toLocaleString('vi-VN', options2);
        this.carOut.ticketEffectiveDate = effectiveDate;
        this.carOut.ticketExpiryDate = expiryDate;

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
        this.storage.upload(filePath, this.plateNumberImage).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(url => {
            this.urlCarOutImage = url;
          })))
        ).subscribe();
        const now = new Date();
        this.timeOut = now.toLocaleString('vi-VN', options);
        console.log(carOut);
      }, error => {
        // car existing but ticket expiring
        if (error.status === 404) {
          Swal.fire({
            title: 'Vé xe đã quá hạn!',
            text: 'Vui lòng liên hệ phòng vé để đóng phí quá hạn hoặc gia hạn vé!',
            icon: 'warning',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
        }
        // the system unable able to scan the image => numberPlate being null

        if (error.status === 406) {
          Swal.fire({
            title: 'Không quét được biển số',
            text: 'Vui lòng ấn nút tìm xe',
            icon: 'error',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
        }
        // the system error
        if (error.status === 500) {
          Swal.fire({
            title: 'Lỗi hệ thống! Không nhận được file hoặc hệ thống trục trặc',
            text: 'Vui lòng thử ấn vào nút tìm xe!',
            icon: 'error',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'

          });
        }
      });
    } else {
      Swal.fire({
        title: 'Tập tin không hợp lệ',
        text: 'Vui lòng tải lại',
        icon: 'error',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'darkorange'
      });
    }
  }

  saveCarOut() {
    debugger
    // car's data is not found
    if (this.carOut == null) {
      let timerInterval;
      Swal.fire({
        icon: 'warning',
        title: 'Vui lòng tìm dữ liệu xe trước khi lưu!',
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
      urlCarOutImage: this.urlCarOutImage,
      carDTO: {
        id: this.carOut.carId
      }
    };
    console.log(carOut);
    this.carInOutService.saveCarOut(carOut).subscribe(() => {
      Swal.fire({
        title: 'Lưu thành công!',
        text: 'Xin mời xe ra',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'darkorange'
      });
      this.carOut = null;
      this.timeOut = '';
      this.urlCarOutImage = null;
      this.ngOnInit();
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi hệ thống',
        text: 'Vui lòng liên nhân viên kĩ thuật!'
      });
    });
  }

  searchCarOut(customerName: string, customerPhoneNumber: string, carPlateNumber: string) {
    this.listEmpty = null;
    this.carInOutService.searchCarOut(customerName, customerPhoneNumber, carPlateNumber).subscribe(carInList => {
      console.log(carInList);
      this.dataList = carInList;
    }, error => {
      this.listEmpty = 'Danh sách trống.';
    });
  }

  selectCar(carId: number) {
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].carId == carId) {
        this.carOut = this.dataList[i];
        return;
      }
    }
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
    const now = new Date();
    this.timeOut = now.toLocaleString('vi-VN', options);
  }
}
