import {Component, OnInit} from '@angular/core';

import Chart from 'chart.js/auto';
import {registerables} from 'chart.js';

import {TicketService} from "../../service/ticket.service";
import {CustomerService} from "../../service/customer.service";


Chart.register(...registerables)
// Chart.defaults.global.defaultFontFamily = 'Lato';
// Chart.defaults.global.defaultFontSize = 25;
// Chart.defaults.global.defaultFontColor = '#777';


@Component({
  selector: 'app-statistic-by-day-month-year',
  templateUrl: './statistic-by-day-month-year.component.html',
  styleUrls: ['./statistic-by-day-month-year.component.css']
})
export class StatisticByDayMonthYearComponent implements OnInit {

  ticketList: number[] = []
  customerList: number[] = []
  monthList: string[] = []
  errorMessage: boolean = false;
  sinceMonth: any
  toMonth: any

  constructor(private ticketService: TicketService, private customer: CustomerService) {
  }

  ngOnInit(): void {
    this.renderChart();
  }

  statistics(sinceMonthh, toMonthh, year) {
    this.sinceMonth = parseInt(sinceMonthh)
    this.toMonth = parseInt(toMonthh)
    if (year == '2022-2023') {
      let yearValues = year.split('-');
      let yearStart = parseInt(yearValues[0]);
      let yearEnd = parseInt(yearValues[1]);
      this.ticketService.getTotalCustomerOfMonthOfRange(this.sinceMonth, this.toMonth, yearStart, yearEnd).subscribe((customerList) => {
        this.customerList = customerList;
        this.ticketService.getTotalTicketOfMonthOfRange(this.sinceMonth, this.toMonth, yearStart, yearEnd).subscribe((customerList) => {
          this.customerList = customerList;
          this.renderChart()
        })
      })
    }

    let sinceMonth = parseInt(sinceMonthh)
    let toMonth = parseInt(toMonthh)
    if (sinceMonthh > toMonthh) {
      return this.errorMessage = true
    }
    this.monthList = []
    for (let i = sinceMonth; i <= toMonth; i++) {
      this.monthList.push("Tháng " + i);
    }

    this.ticketService.getTotalCustomerOfMonth(sinceMonth, toMonth, year).subscribe((customerList) => {
      this.customerList = customerList;
      this.ticketService.getTotalTicketOfMonth(sinceMonth, toMonth, year).subscribe((ticketList) => {
        this.ticketList = ticketList;
        this.renderChart()
        // });
      });
    });
  }


  renderChart() {
    let myChart = document.getElementById('myChart');
    let chart = Chart.getChart('myChart');
    if (chart) {
      chart.destroy();
    }
    debugger
    new Chart(myChart, {
      type: 'bar', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
      data: {
        labels: this.monthList,
        datasets: [
          {
            label: 'Số lượng khách hàng',
            data: this.customerList,
            backgroundColor: 'rgb(255,99,132)',
            borderWidth: 1,
            borderColor: '#777',
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',


          },
          {
            label: "Số lượng vé",
            data: this.ticketList,
            // fill: false,
            borderColor: '#777',
            // lineTension: 0.1,
            backgroundColor: "rgb(54,162,235)",
            borderWidth: 1,
            hoverBorderWidth: 3,
            hoverBorderColor: '#000',
            stack: 'Stack 2' // Đặt tên cho phân tầng

          }
        ]
      },
      options: {
        legend: {
          display: true,
          position: 'right',
          labels: {
            fontColor: '#000',
            fontsize: 30
          }
        },
        layout: {
          padding: {
            left: 50,
            right: 0,
            bottom: 0,
            top: 0
          }
        },
        tooltips: {
          enabled: true
        }
      },
      responsive: true,
      maintainAspectRatio: false,
      defaultFontFamily: 'Lato',
      defaultFontSize: 30,
      defaultFontColor: '#777'
    });
  }

}
