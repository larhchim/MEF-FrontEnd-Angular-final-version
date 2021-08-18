import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GradesProfilsComponent } from './grades-profils.component';

describe('GradesProfilsComponent', () => {
  let component: GradesProfilsComponent;
  let fixture: ComponentFixture<GradesProfilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GradesProfilsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradesProfilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
