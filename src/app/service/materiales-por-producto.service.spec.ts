import { TestBed } from '@angular/core/testing';

import { MaterialesPorProductoService } from './materiales-por-producto.service';

describe('MaterialesPorProductoService', () => {
  let service: MaterialesPorProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaterialesPorProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
