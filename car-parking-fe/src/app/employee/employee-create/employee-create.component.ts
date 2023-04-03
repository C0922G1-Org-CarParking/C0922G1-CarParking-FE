import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {$} from 'protractor';

const host = 'https://provinces.open-api.vn/api/';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  ngOnInit(): void {
  }

}
