import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGestionnaireComponent } from './home-gestionnaire.component';

describe('HomeGestionnaireComponent', () => {
  let component: HomeGestionnaireComponent;
  let fixture: ComponentFixture<HomeGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeGestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
