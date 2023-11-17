export class Zurlrest {
    public static dominio: string = "http://localhost:9090/control-costos";

    public static departamento: string = Zurlrest.dominio + '/departamento';
    public static inventariomp: string = Zurlrest.dominio + '/inventariomp';
    public static inventarioppv: string = Zurlrest.dominio + '/inventarioppv';
    public static materiaprima: string = Zurlrest.dominio + '/materiaprima';
    public static planilla: string = Zurlrest.dominio + '/planilla';
    public static proucto: string = Zurlrest.dominio + '/proucto';
    public static puesto: string = Zurlrest.dominio + '/puesto';
    public static rubro: string = Zurlrest.dominio + '/rubro';

    public static gastosAdministrativos: string = Zurlrest.dominio + '/gastosadministrativos';
    public static sueldosGastosMensuales: string = Zurlrest.dominio + '/sueldosgastosmensuales';
    public static materialesPorProduto: string = Zurlrest.dominio + '/materialesporproducto';
    public static planillaPorProducto: string = Zurlrest.dominio + '/planillasporproducto';

}