import { Injectable } from '@angular/core';
import { PlanillaPorProducto } from '../models/planilla-por-producto';
import { EntityParser } from '../utils/entity.parser';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable({
  providedIn: 'root'
})
export class PlanillaPorProductoService extends AbSerbice<PlanillaPorProducto>{

  private url: string = Zurlrest.planillaPorProducto;

  constructor(public rests: RestService) {
    super(rests);
  }

  protected getUrl(): string {
    return this.url;
  }
  protected getEntityId(data: any): number {
    var id = 0;
    try {
      id = data.idDepartamento;
    } catch (ignore) {
      // error parsin id of entity
    }
    if (id === 0) {
      return 0;
    } else {
      return id;
    }
  }
  protected toEntity(data: any): PlanillaPorProducto {
    return EntityParser.parsePlanillaPorProducto(data);
  }
}
