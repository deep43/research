import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReplacePDFComponent } from './replace-pdf.component';

describe('ReplacePDFComponent', () => {
  let component: ReplacePDFComponent;
  let fixture: ComponentFixture<ReplacePDFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplacePDFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReplacePDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
