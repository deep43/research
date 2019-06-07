import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorRatingsComponent } from './sector-ratings.component';

describe('SectorRatingsComponent', () => {
  let component: SectorRatingsComponent;
  let fixture: ComponentFixture<SectorRatingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectorRatingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectorRatingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
