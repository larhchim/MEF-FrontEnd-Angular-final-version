import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeGestionnaireComponent } from './liste-gestionnaire.component';

describe('ListeGestionnaireComponent', () => {
  let component: ListeGestionnaireComponent;
  let fixture: ComponentFixture<ListeGestionnaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeGestionnaireComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeGestionnaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
