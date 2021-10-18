import { CajeroAutomatico } from './atm.js';
import { Vista } from './vistas.js';

const cajeroAutomatico = new CajeroAutomatico();
const vista = new Vista(cajeroAutomatico);
vista.cargarVista();