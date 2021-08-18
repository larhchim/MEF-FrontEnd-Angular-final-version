import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CentraleHomeComponent } from './centrale-home.component';

describe('CentraleHomeComponent', () => {
  let component: CentraleHomeComponent;
  let fixture: ComponentFixture<CentraleHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CentraleHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CentraleHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
