import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterCentreComponent } from './ajouter-centre.component';

describe('AjouterCentreComponent', () => {
  let component: AjouterCentreComponent;
  let fixture: ComponentFixture<AjouterCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjouterCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
