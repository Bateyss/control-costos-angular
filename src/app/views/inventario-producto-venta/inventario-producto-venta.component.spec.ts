import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioProductoVentaComponent } from './inventario-producto-venta.component';

describe('InventarioProductoVentaComponent', () => {
  let component: InventarioProductoVentaComponent;
  let fixture: ComponentFixture<InventarioProductoVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioProductoVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InventarioProductoVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
