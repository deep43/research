import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RestrictedFlagComponent } from './restricted-flag.component';

describe('RestrictedFlagComponent', () => {
  let component: RestrictedFlagComponent;
  let fixture: ComponentFixture<RestrictedFlagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RestrictedFlagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RestrictedFlagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
