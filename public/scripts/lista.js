import { enviarDELETE } from "./enviar.js";
import { obtenerElementoPorId, obtenerNombreDelRecurso, recargar } from "./frontUtils.js";

var eventoDelRegistroSeleccionado;
const myModal = new bootstrap.Modal(obtenerElementoPorId("modal-pregunta", {}));

document.addEventListener("DOMContentLoaded", () => {
  // [...document.getElementsByClassName("borrar")].forEach(e => e.addEventListener("click", abrirModalPregunta));
  const botonesBorrar = document.getElementsByClassName("borrar");
  if (!botonesBorrar.item(0).hasAttribute("disabled")) {
    [...botonesBorrar].forEach(e => e.addEventListener("click", abrirModalPregunta));
  }
  // [...document.getElementsByClassName("editar")].forEach(e => e.addEventListener("click", enviarAEditar));
  obtenerElementoPorId("btn-si").addEventListener("click", confirmarBorrado);
  obtenerElementoPorId("btn-mensaje").addEventListener("click", recargar);
});



/**
 * Muestra un modal requiriendo la confirmacion para avanzar con el borrado
 * @param {Event} evento El evento desatado al hacer click en el icono de borrar
 */
function abrirModalPregunta(evento) {

  eventoDelRegistroSeleccionado = evento;
  myModal.show();

}



/**
 * Ejecuta la accion del borrado del registro
 */
async function confirmarBorrado() {

  await borrar(eventoDelRegistroSeleccionado);

  myModal.hide();

}



/**
 * Borra el registro seleccionado del recurso
 * @param {Event | HTMLElement} evento El evento desatado al hacer click en el icono de borrar
 */
async function borrar(evento) {

  const id = obtenerID(evento);

  const recurso = obtenerNombreDelRecurso();

  await enviarDELETE(`./${recurso}/${id}`);

}



/**
 * Obtiene la id del registro seleccionado
 * @param {Event} evento El evento desatado al hacer click en el icono de borrar
 * @returns {String} Devuelve la id del registro
 */
function obtenerID(evento) {
  let tdDeLaId = evento.target.parentNode.parentNode;
  
  if (evento.target.tagName === "I"){
    tdDeLaId = tdDeLaId.parentNode;
  }

  tdDeLaId = tdDeLaId.firstChild.nextSibling;

  return tdDeLaId.innerHTML;
}