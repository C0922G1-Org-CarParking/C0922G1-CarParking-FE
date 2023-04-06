import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNewsDetailComponent } from './home-page-news-detail.component';

describe('HomePageNewsDetailComponent', () => {
  let component: HomePageNewsDetailComponent;
  let fixture: ComponentFixture<HomePageNewsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageNewsDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageNewsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
