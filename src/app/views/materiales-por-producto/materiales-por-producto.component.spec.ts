import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialesPorProductoComponent } from './materiales-por-producto.component';

describe('MaterialesPorProductoComponent', () => {
  let component: MaterialesPorProductoComponent;
  let fixture: ComponentFixture<MaterialesPorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialesPorProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialesPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
