import {Component, DoCheck, OnChanges, OnInit} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  username: string;
  currentUser: string;
  nameEmployee: string;
  role: string;
  isLoggedIn = false;

  constructor(private router: Router) {}

  loadHeader(): void {}


  ngOnInit(): void {
    this.loadHeader();
  }

  logOut() {}

}
