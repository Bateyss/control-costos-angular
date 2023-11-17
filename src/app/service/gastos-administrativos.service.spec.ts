import { TestBed } from '@angular/core/testing';

import { GastosAdministrativosService } from './gastos-administrativos.service';

describe('GastosAdministrativosService', () => {
  let service: GastosAdministrativosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GastosAdministrativosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
