import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageNewsListComponent} from './home-page-news-list/home-page-news-list.component';
import {HomePageNewsDetailComponent} from './home-page-news-detail/home-page-news-detail.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list'
}, {
  path: 'list',
  component: HomePageNewsListComponent,
}, {
  path: 'detail/:id',
  component: HomePageNewsDetailComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
