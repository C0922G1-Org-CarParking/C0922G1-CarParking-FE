import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CarInOutService} from '../../service/car-in-out.service';
import {ICarInOut} from '../../model/i-car-in-out';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';
import {strict} from 'assert';


@Component({
  selector: 'app-car-in',
  templateUrl: './car-in.component.html',
  styleUrls: ['./car-in.component.css']
})
export class CarInComponent implements OnInit {
  dataList: ICarInOut[];
  plateNumberImage?: File;
  carIn?: ICarInOut;
  timeIn = '';
  now: any;
  urlCarInImage = '../../../../assets/car-images/default.png';
  @ViewChild('uploadFile', {static: true}) public avatarDom: ElementRef | undefined;

  public listEmpty: string;


  constructor(private carInOutService: CarInOutService,
              private router: Router,
              private storage: AngularFireStorage) {
  }


  ngOnInit(): void {
    this.searchCarIn('', '', '');
  }

  saveCarIn() {
    debugger
    // car's data not found
    if (this.carIn == null) {
      let timerInterval;
      Swal.fire({
        title: 'Vui lòng tìm xe trước khi lưu!',
        icon: 'warning',
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
    const carInSaved = {
      timeIn: this.timeIn,
      carDTO: {
        id: this.carIn.carId
      },
      urlCarInImage: this.urlCarInImage
    };
    console.log(carInSaved.timeIn);
    this.carInOutService.saveCarIn(carInSaved).subscribe(() => {
      Swal.fire({
        title: 'Lưu thành công!',
        text: 'Xin mời xe vào!',
        icon: 'success',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'darkorange'
      });
      this.carIn = null;
      this.urlCarInImage = '../../../../assets/car-images/default.png';
      this.timeIn = '';
      this.searchCarIn('', '', '');
      // setTimeout(() => {
      //   window.location.reload();
      // }, 3000);
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Lỗi hệ thống',
        text: 'Vui lòng liên nhân viên kĩ thuật!',
        confirmButtonText: 'Xác nhận',
        confirmButtonColor: 'darkorange'
      });
    });
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


    if (this.plateNumberImage != null) {
      const filePath = this.plateNumberImage.name;
      const fileRef = this.storage.ref(filePath);

      const imageFormData = new FormData();
      imageFormData.append('plateNumberImage', this.plateNumberImage, this.plateNumberImage.name);
      let timerInterval;
      Swal.fire({
        title: 'Đang xử lý!',
        html: 'Vui lòng đợi trong giây lát...',
        timerProgressBar: true,
        allowOutsideClick: false,
        timer: 3500,
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
      });

      this.carInOutService.searchCarInByScanning(imageFormData).subscribe(carIn => {
        setTimeout(() => {
          Swal.fire({
            title: 'Đã tìm thấy dữ liệu xe!',
            text: 'Ấn lưu thông tin để cho xe vào',
            icon: 'success',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
        },3500);
        this.carIn = carIn;
        const options2 = {
          timeZone: 'Asia/Ho_Chi_Minh',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour12: false
        };
        let effectiveDate = new Date(this.carIn.ticketEffectiveDate).toLocaleString('vi-VN', options2);
        let expiryDate = new Date(this.carIn.ticketExpiryDate).toLocaleString('vi-VN', options2);
        this.carIn.ticketEffectiveDate = effectiveDate;
        this.carIn.ticketExpiryDate = expiryDate;
        const now = new Date();
        this.storage.upload(filePath, this.plateNumberImage).snapshotChanges().pipe(
          finalize(() => (fileRef.getDownloadURL().subscribe(url => {
            this.urlCarInImage = url;
          })))
        ).subscribe();
        // for display and save
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
        this.timeIn = now.toLocaleString('vi-VN', options);
      }, error => {
        console.log(error);
        // car not existing in database
        if (error.status === 404) {
          Swal.fire({
            title: 'Không tìm thấy xe!',
            text: 'Xe có thể đã hết vé, thử cách khác bằng cách ấn vào nút tìm xe!',
            icon: 'question',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
          this.timeIn = '';
        }
        // the system unable to scan the image
        if (error.status === 406) {
          Swal.fire({
            title: 'Không quét được biển số',
            text: 'Vui lòng ấn vào tìm xe',
            icon: 'error',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
          this.timeIn = '';
        }
        // the system error or the image not identified
        if (error.status === 500) {
          Swal.fire({
            title: 'Lỗi hệ thống!',
            text: 'Không nhận được file hoặc hệ thống trục trặc, vui lòng liên hệ nhân viên kĩ thuật!',
            icon: 'error',
            confirmButtonText: 'Xác nhận',
            confirmButtonColor: 'darkorange'
          });
          this.timeIn = '';
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

  searchCarIn(customerName: string, customerPhoneNumber: string, carPlateNumber: string) {
    this.carInOutService.searchCarIn(customerName, customerPhoneNumber, carPlateNumber).subscribe(carInList => {
      console.log(carInList);
      this.dataList = carInList;
    }, error => {
      this.listEmpty = 'Danh sách trống.';
    });
  }

  selectCar(carId: number) {
    debugger
    for (let i = 0; i < this.dataList.length; i++) {
      if (this.dataList[i].carId == carId) {
        this.carIn = this.dataList[i];
        break;
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
    this.timeIn = now.toLocaleString('vi-VN', options);
  }

}
