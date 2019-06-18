import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsDistributionComponent } from './published-reports.component';

describe('PublishedReportsComponent', () => {
  let component: ReportsDistributionComponent;
  let fixture: ComponentFixture<ReportsDistributionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsDistributionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
