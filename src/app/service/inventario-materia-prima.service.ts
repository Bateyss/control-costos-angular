import { Injectable } from '@angular/core';
import { InventarioMateriaPrima } from '../models/inventario-materia-prima';
import { AbSerbice } from './abs/abstract.service';
import { RestService } from './abs/rest.service';
import { Zurlrest } from './abs/zurlrest';
import { EntityParser } from '../utils/entity.parser';

@Injectable({
    providedIn: 'root'
})
export class InventarioMateriaPrimaService extends AbSerbice<InventarioMateriaPrima> {

    private url: string = Zurlrest.inventariomp;

    constructor(public rests: RestService) {
        super(rests);
    }

    protected getUrl(): string {
        return this.url;
    }
    protected getEntityId(data: any): number {
        var id = 0;
        try {
            id = data.idInventarioMP;
        } catch (ignore) {
            // error parsin id of entity
        }
        if (id === 0) {
            return 0;
        } else {
            return id;
        }
    }
    protected toEntity(data: any): InventarioMateriaPrima {
        return EntityParser.parseInventarioMateriaPrima(data);
    }
}
