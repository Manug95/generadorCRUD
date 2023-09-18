import { enviarDELETE } from "./enviar.js";
import { obtenerElementoPorId, obtenerNombreDelRecurso, recargar } from "./frontUtils.js";

const myModal = new bootstrap.Modal(obtenerElementoPorId("modal-pregunta", {}));

document.addEventListener("DOMContentLoaded", () => {
  // [...document.getElementsByClassName("borrar")].forEach(e => e.addEventListener("click", abrirModalPregunta));
  const botonesBorrar = document.getElementsByClassName("borrar");
  if (!botonesBorrar.item(0).hasAttribute("disabled")) {
    [...botonesBorrar].forEach(e => e.addEventListener("click", abrirModalPregunta));
  }
  // [...document.getElementsByClassName("editar")].forEach(e => e.addEventListener("click", editar));
  obtenerElementoPorId("btn-si").addEventListener("click", confirmarBorrado);
  obtenerElementoPorId("btn-mensaje").addEventListener("click", recargar);
});



/**
 * Muestra un modal requiriendo la confirmacion para avanzar con el borrado
 */
function abrirModalPregunta() {

  myModal.show();

}



/**
 * Ejecuta la accion del borrado del registro
 */
async function confirmarBorrado() {

  await borrar();

  myModal.hide();

}



/**
 * Borra el registro seleccionado del recurso
 */
async function borrar() {

  const id = obtenerID();

  const recurso = obtenerNombreDelRecurso();

  await enviarDELETE(`../${recurso}/${id}`);

}



/**
 * Obtiene la id del registro seleccionado
 * @returns {String} Devuelve la id del registro
 */
function obtenerID() {

  let tdDeLaId = document.getElementsByTagName("td").item(0);
  return tdDeLaId.innerHTML;

}