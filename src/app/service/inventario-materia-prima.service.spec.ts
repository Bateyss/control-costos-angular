import { TestBed } from '@angular/core/testing';

import { InventarioMateriaPrimaService } from './inventario-materia-prima.service';

describe('InventarioMateriaPrimaService', () => {
  let service: InventarioMateriaPrimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioMateriaPrimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
