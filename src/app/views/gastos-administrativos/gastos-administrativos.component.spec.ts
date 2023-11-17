import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GastosAdministrativosComponent } from './gastos-administrativos.component';

describe('GastosAdministrativosComponent', () => {
  let component: GastosAdministrativosComponent;
  let fixture: ComponentFixture<GastosAdministrativosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GastosAdministrativosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GastosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
