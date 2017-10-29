import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestEmployeesWidget } from './best-employees-widget';

describe('UserComponent', () => {
  let component: BestEmployeesWidget;
  let fixture: ComponentFixture<BestEmployeesWidget>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestEmployeesWidget ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestEmployeesWidget);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
