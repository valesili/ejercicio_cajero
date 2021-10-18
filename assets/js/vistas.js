import { Login } from './login.js';

const fetchHtmlAsText = async (url) => {
  const response = await fetch(url);
  return response.text();
}

export class Vista {
  
  constructor(cajeroAutomatico) {
    this.cajeroAutomatico = cajeroAutomatico;
  }

  /**
   * 
   * @param { 'login' | 'cuenta' | 'consultar_cuenta' | 'ingresar_monto' | 'retirar_monto' } vista 
   */
  async cargarVista(vista = 'login') {
    const body = document.querySelector('body');
    const vistaContent = await fetchHtmlAsText(`../components/${vista}.html`);
    body.innerHTML = vistaContent;

    this.poblarData(vista);
  }

  /**
   * 
   * @param { 'login' | 'cuenta' | 'consultar_cuenta' | 'ingresar_monto' | 'retirar_monto' } vista 
   */
  poblarData(vista) {
    switch (vista) {
      case 'cuenta':
        this.cargarCuenta();
        break;

      case 'consultar_cuenta':
        this.cargarConsultarCuenta();
        break;

      case 'ingresar_monto':
        this.cargarIngresarMonto();
        break;

      case 'retirar_monto':
        this.cargarRetirarMonto();
        break;

      default:
        this.cargarLogin();
        break;
    }
  }

  cargarLogin() {
    const login = new Login();

    login.btnIngresar.addEventListener('click', () => {
      const { nDoc, clave } = login.obtenerCredenciales();
      this.cajeroAutomatico.iniciarSesion(nDoc, clave);

      if (this.cajeroAutomatico.usuarioLogeado) this.cargarVista('cuenta');
    });
  }

  cargarCuenta() {
    document.getElementById('saludo').innerText = `¡Hola ${this.cajeroAutomatico.usuarioLogeado.nombre}!`;

    const btnConsultarCuenta = document.getElementById('btnConsultarCuenta');
    const btnIngresarMonto = document.getElementById('btnIngresarMonto');
    const btnRetirarMonto = document.getElementById('btnRetirarMonto');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');

    btnConsultarCuenta.addEventListener('click', () => this.cargarVista('consultar_cuenta'));
    btnIngresarMonto.addEventListener('click', () => this.cargarVista('ingresar_monto'));
    btnRetirarMonto.addEventListener('click', () => this.cargarVista('retirar_monto'));
    btnCerrarSesion.addEventListener('click', () => {
      this.cargarVista();
      this.cajeroAutomatico.cerrarSesion();
    });
  }

  cargarConsultarCuenta() {
    this.configBtnRegresar();
    document.getElementById('saldo').innerText = this.cajeroAutomatico.consultarSaldo();
  }

  cargarIngresarMonto() {
    this.configBtnRegresar();
    const inputMonto = document.getElementById('monto');
    const btn = document.getElementById('btnIngresarMonto');
    
    btn.addEventListener('click', () => {
      const monto = inputMonto.value;
      document.getElementById('saldoNuevo').innerText = this.cajeroAutomatico.ingresarMonto(monto);
      inputMonto.value = null;
    })
  }

  cargarRetirarMonto() {
    this.configBtnRegresar();
    const inputMonto = document.getElementById('monto');
    const btn = document.getElementById('btnRetirarMonto');
    
    btn.addEventListener('click', () => {
      const monto = inputMonto.value;
      document.getElementById('saldoNuevo').innerText = this.cajeroAutomatico.retirarMonto(monto);
      inputMonto.value = null;
    })
  }

  configBtnRegresar() {
    const btnRegresar = document.getElementById('btnRegresar');
    btnRegresar.addEventListener('click', () => this.cargarVista('cuenta'));
  }
}