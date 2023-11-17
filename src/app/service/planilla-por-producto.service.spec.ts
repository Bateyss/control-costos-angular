import { TestBed } from '@angular/core/testing';

import { PlanillaPorProductoService } from './planilla-por-producto.service';

describe('PlanillaPorProductoService', () => {
  let service: PlanillaPorProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanillaPorProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
