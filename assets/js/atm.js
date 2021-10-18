export class CajeroAutomatico {
  cuentas = [
    { nombre: 'Valeria Silva', nDoc: '72678792', clave: '1234', saldo: 510 },
    
    { nombre: 'Juliana Ruiz', nDoc: '72123493', clave: '5678', saldo: 600 },
    
    { nombre: 'América Isuiza', nDoc: '62678734', clave: '9101', saldo: 300 },
    
    { nombre: 'Siu Leon', nDoc: '74557723', clave: '1213', saldo: 211 },
    
    { nombre: 'Joysse Devoto', nDoc: '72348123', clave: '1415', saldo: 80 },
  ];

  usuarioLogeado;

  constructor() {
  }

  iniciarSesion(nDoc, clave) {
    this.usuarioLogeado = this.cuentas.find(cuenta => cuenta.nDoc == nDoc && cuenta.clave == clave);
  }

  consultarSaldo() {
    return `Tu saldo actual es: S/ ${this.usuarioLogeado.saldo}`;
  }

  /**
   * 
   * @param {number} monto 
   */
  ingresarMonto(monto) {
    monto = Number(monto);
    if (this.usuarioLogeado.saldo + monto <= 990) {
      this.usuarioLogeado.saldo += monto;
      return `Tu saldo ahora es: S/ ${this.usuarioLogeado.saldo}`;
    }
    else return 'El saldo no debe superar los S/ 990';
  }

  /**
   * 
   * @param {number} monto 
   */
  retirarMonto(monto) {
    monto = Number(monto);
    if (this.usuarioLogeado.saldo - monto >= 10) {
      this.usuarioLogeado.saldo -= monto;
      return `Tu saldo ahora es: S/ ${this.usuarioLogeado.saldo}`;
    }
    else return 'El saldo no debe ser menor a S/ 10';
  }

  cerrarSesion() {
    this.usuarioLogeado = null;
  }
}