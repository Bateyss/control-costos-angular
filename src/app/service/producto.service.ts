import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { AbSerbice } from './abs/abstract.service';
import { Zurlrest } from './abs/zurlrest';
import { RestService } from './abs/rest.service';
import { EntityParser } from '../utils/entity.parser';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends AbSerbice<Producto>{

  private url: string = Zurlrest.proucto;

  constructor(public rests: RestService) {
    super(rests);
  }

  protected getUrl(): string {
    return this.url;
  }
  protected getEntityId(data: any): number {
    var id = 0;
    try {
      id = data.idProducto;
    } catch (ignore) {
      // error parsin id of entity
    }
    if (id === 0) {
      return 0;
    } else {
      return id;
    }
  }
  protected toEntity(data: any): Producto {
    return EntityParser.parseProducto(data);
  }
}
