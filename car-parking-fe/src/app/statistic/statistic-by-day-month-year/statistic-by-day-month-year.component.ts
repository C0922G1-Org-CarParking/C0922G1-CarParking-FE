import {Component, OnInit} from '@angular/core';
import {TicketService} from "../../service/ticket.service";
import {Ticket} from "../../model/ticket";
import {CustomerService} from "../../service/customer.service";
import {Customer} from "../../model/customer";

@Component({
  selector: 'app-statistic-by-day-month-year',
  templateUrl: './statistic-by-day-month-year.component.html',
  styleUrls: ['./statistic-by-day-month-year.component.css']
})
export class StatisticByDayMonthYearComponent implements OnInit {

  ticketList: any[] = []
  customerList: any[] = []
  monthList: any[] = []
  monthId:any




  constructor(private ticketService: TicketService, private customer: CustomerService) {
  }

  ngOnInit(): void {
    this.renderChart(this.ticketList, this.customerList , this.monthList);
  }

  private renderChart(ticketList,customerList,monthList) {
    // Global Options
    // Chart.defaults..defaultFontFamily = 'Lato';
    // Chart.defaults.global.defaultFontSize = 20;
    // Chart.defaults.global.defaultFontColor = '#777';
    let array = ["Tháng 1", "Tháng 3", "Tháng 5", "Tháng 7", "Tháng 9", "Tháng 12"]

    // @ts-ignore
    // @ts-ignore
    const myChart = new Chart("myChart", {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: array,
        datasets: [
          {
            label: 'Số lượng vé',
            data: ticketList,
            backgroundColor: [
              'rgb(255,99,132)',
            ],
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',
          },
          {
            label: "Số lượng khách hàng",
            data: customerList,
            // fill: false,
            borderColor: "rgb(189,0,0, 2)",
            // lineTension: 0.1,
            backgroundColor: [
              'rgb(54,162,235)',
            ],
            stack: 'Stack 2' // Đặt tên cho phân tầng

          }
        ]
      },
      options: {
        // legend: {
        //   display: true,
        //   position: 'right',
        //   labels: {
        //     fontColor: '#000'
        //   }
        // },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        // tooltips: {
        //   enabled: true
        // }
      }
    });

  }
   getTotalTicketOfMonth(month: number) {
    // this.ticketService.getTotalTicketOfMonth(month).subscribe(data=>{
    //
    //
    // })
  }

  statistics(value: string, value2: string) {
    let sinceMonth = parseInt(value)
    let toMonth = parseInt(value2)



    for (let i = sinceMonth ; i <= toMonth ;i++){
      this.monthList.push(i)
      this.ticketList.push(this.getTotalTicketOfMonth(i))
      this.customerList.push(this.getTotalCustomerOfMonth(i))
    }
  }




  private getTotalCustomerOfMonth(i: number) {

  }
}
