import {Component, OnInit} from '@angular/core';
import {ICarInOut} from "../../model/i-car-in-out";
import {CarInOutService} from "../../service/car-in-out.service";

@Component({
  selector: 'app-car-in',
  templateUrl: './car-in.component.html',
  styleUrls: ['./car-in.component.css']
})
export class CarInComponent implements OnInit {
  dataList: ICarInOut[];
  private carIn: ICarInOut;

  constructor(private carInOutService: CarInOutService) {
  }

  ngOnInit(): void {
  }

  searchCarIn(carPlateNumber: string,
              customerName: string,
              customerPhoneNumber: string) {

    this.carInOutService.searchCarIn(carPlateNumber, customerName, customerPhoneNumber).subscribe(carInList => {

      console.log(carInList);
      this.dataList = carInList;
    })
  }

  selectCar(carId: number) {
    debugger
    for (let i = 0; i < this.dataList.length; i++) {
      debugger
      if (this.dataList[i].carId == carId) {
        this.carIn = this.dataList[i];
        console.log(this.carIn);
        return;
      }
    }
  }
}
