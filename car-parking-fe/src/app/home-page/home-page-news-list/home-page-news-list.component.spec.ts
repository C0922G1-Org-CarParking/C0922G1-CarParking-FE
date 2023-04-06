import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageNewsListComponent } from './home-page-news-list.component';

describe('HomePageNewsListComponent', () => {
  let component: HomePageNewsListComponent;
  let fixture: ComponentFixture<HomePageNewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageNewsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageNewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
