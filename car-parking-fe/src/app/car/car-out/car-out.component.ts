import {Component, OnInit} from '@angular/core';
import {ICarInOut} from "../../model/i-car-in-out";
import {CarInOutService} from "../../service/car-in-out.service";
import {isFromDtsFile} from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
  selector: 'app-car-out',
  templateUrl: './car-out.component.html',
  styleUrls: ['./car-out.component.css']
})
export class CarOutComponent implements OnInit {

  dataList: ICarInOut[];
  carOut: ICarInOut;

  constructor(private carInOutService: CarInOutService) {
  }

  ngOnInit(): void {
  }

  searchCarOut(carPlateNumber: string,
               customerName: string,
               customerPhoneNumber: string) {

    this.carInOutService.searchCarOut(carPlateNumber, customerName, customerPhoneNumber).subscribe(carInList => {
      console.log(carInList);
      this.dataList = carInList;
    })
  }

  selectCar(carId: number) {
    for (let i = 0; i < this.dataList.length; i++) {
      debugger
      if (this.dataList[i].carId == carId) {
        this.carOut = this.dataList[i];
        console.log(this.carOut);
        return;
      }
    }
  }
}
