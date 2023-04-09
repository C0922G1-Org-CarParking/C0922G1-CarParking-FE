import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../security-authentication/service/token-storage.service";
import {ShareService} from "../security-authentication/service/share.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLoggedIn = false;
  username: string;

  constructor(private tokenStorageService: TokenStorageService,
              private shareService: ShareService) {
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.username = this.tokenStorageService.getUser().username;
    }
    this.isLoggedIn = this.username != null;
  }


  ngOnInit(): void {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
    this.loadHeader();
  }

}

