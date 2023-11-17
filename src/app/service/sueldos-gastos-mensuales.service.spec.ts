import { TestBed } from '@angular/core/testing';

import { SueldosGastosMensualesService } from './sueldos-gastos-mensuales.service';

describe('SueldosGastosMensualesService', () => {
  let service: SueldosGastosMensualesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SueldosGastosMensualesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
