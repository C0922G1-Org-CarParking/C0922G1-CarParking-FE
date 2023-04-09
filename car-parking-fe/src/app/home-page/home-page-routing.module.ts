import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomePageNewsListComponent} from './home-page-news-list/home-page-news-list.component';
import {HomePageNewsDetailComponent} from './home-page-news-detail/home-page-news-detail.component';


const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  redirectTo: 'list'
}, {
  path: 'list/:currentPage/:keyword',
  component: HomePageNewsListComponent,
},  {
  path: 'list/:currentPage',
  component: HomePageNewsListComponent,
}, {
  path: 'list',
  component: HomePageNewsListComponent,
}, {
  path: 'detail/:id/:currentPage/:keyword',
  component: HomePageNewsDetailComponent,
}, {
  path: 'detail/:id/:currentPage',
  component: HomePageNewsDetailComponent,
}, {
    path: 'detail/:id',
    component: HomePageNewsDetailComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule { }
