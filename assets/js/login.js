export class Login {
  constructor() {
    this.nDocEl = document.getElementById('nDoc');
    this.claveEl = document.getElementById('clave');
    this.btnIngresar = document.getElementById('ingresar');
  }

  obtenerCredenciales() {
    const nDoc = this.nDocEl.value;
    const clave = this.claveEl.value;
    return { nDoc, clave };
  }
}