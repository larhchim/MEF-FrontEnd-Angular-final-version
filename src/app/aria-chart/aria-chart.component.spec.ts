import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AriaChartComponent } from './aria-chart.component';

describe('AriaChartComponent', () => {
  let component: AriaChartComponent;
  let fixture: ComponentFixture<AriaChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AriaChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AriaChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
