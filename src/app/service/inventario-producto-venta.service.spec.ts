import { TestBed } from '@angular/core/testing';

import { InventarioProductoVentaService } from './inventario-producto-venta.service';

describe('InventarioProductoVentaService', () => {
  let service: InventarioProductoVentaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventarioProductoVentaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
