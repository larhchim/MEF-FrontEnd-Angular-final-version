import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDirectionsComponent } from './list-directions.component';

describe('ListDirectionsComponent', () => {
  let component: ListDirectionsComponent;
  let fixture: ComponentFixture<ListDirectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDirectionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListDirectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
