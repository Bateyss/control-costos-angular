import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanillaPorProductoComponent } from './planilla-por-producto.component';

describe('PlanillaPorProductoComponent', () => {
  let component: PlanillaPorProductoComponent;
  let fixture: ComponentFixture<PlanillaPorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanillaPorProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanillaPorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
