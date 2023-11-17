import { Injectable } from '@angular/core';
import { AbSerbice } from './abs/abstract.service';
import { Zurlrest } from './abs/zurlrest';
import { RestService } from './abs/rest.service';
import { EntityParser } from '../utils/entity.parser';
import { SueldoGastosMensuales } from '../models/sueldo-gastos-mensuales';

@Injectable({
  providedIn: 'root'
})
export class SueldosGastosMensualesService extends AbSerbice<SueldoGastosMensuales>{

  private url: string = Zurlrest.sueldosGastosMensuales;

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
  protected toEntity(data: any): SueldoGastosMensuales {
    return EntityParser.parseSueldosGastosMensuales(data);
  }
}
