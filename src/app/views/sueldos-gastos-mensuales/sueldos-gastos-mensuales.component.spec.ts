import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SueldosGastosMensualesComponent } from './sueldos-gastos-mensuales.component';

describe('SueldosGastosMensualesComponent', () => {
  let component: SueldosGastosMensualesComponent;
  let fixture: ComponentFixture<SueldosGastosMensualesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SueldosGastosMensualesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SueldosGastosMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
