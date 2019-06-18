import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAndMoveComponent } from './select-and-move.component';

describe('SelectAndMoveComponent', () => {
  let component: SelectAndMoveComponent;
  let fixture: ComponentFixture<SelectAndMoveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAndMoveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAndMoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
