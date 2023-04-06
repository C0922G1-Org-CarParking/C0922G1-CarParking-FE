import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageNewsListComponent } from './home-page-news-list/home-page-news-list.component';
import {FormsModule} from '@angular/forms';
import { HomePageNewsDetailComponent } from './home-page-news-detail/home-page-news-detail.component';


@NgModule({
  declarations: [HomePageNewsListComponent, HomePageNewsDetailComponent],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    FormsModule
  ]
})
export class HomePageModule { }
