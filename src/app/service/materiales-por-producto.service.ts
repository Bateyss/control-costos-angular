import { Injectable } from '@angular/core';
import { MaterialesPorProducto } from '../models/materiales-por-producto';
import { EntityParser } from '../utils/entity.parser';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';

@Injectable({
  providedIn: 'root'
})
export class MaterialesPorProductoService extends AbSerbice<MaterialesPorProducto>{

  private url: string = Zurlrest.materialesPorProduto;

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
  protected toEntity(data: any): MaterialesPorProducto {
    return EntityParser.parseMaterialesPorProducto(data);
  }
}
