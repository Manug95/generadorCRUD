/**
 * Funcion manejadora que impide que se pude escribir un espacio en un input
 * @param {Event} event El evento que desato la funcion
 */
function bloquearEspacios(event) {
  if (event.key === " ") {
    event.preventDefault();
  }
}



/**
 * Oculta un elemento
 * @param {String} id id del elemento que se desa¿ea ocultar
 */
function ocultarElemento(id) {
  try {
    obtenerElementoPorId(id).classList.add("d-none");
  }
  catch {
    // ...
  }
}



/**
 * Muestra un elemento que esta oculto
 * @param {String} id id del elemento que se desa¿ea mostrar
 */
function mostrarElemento(id) {
  try {
    obtenerElementoPorId(id).classList.remove("d-none");
  }
  catch {
    // ...
  }
}



/**
 * Recupera un elemento HTML del DOM por su ID
 * @param {String} id La id del elemento a recuperar
 * @returns {HTMLElement} El elemento HTML recurado
 */
function obtenerElementoPorId(id) {

  const elemento = document.getElementById(id);
  return elemento;

}



/**
 * retorna la cantidad de elementos hijos que tiene un elemento html
 * @param {String} id del elemento que se quiere contar sus hijos
 * @returns {Number} la cantidad de hijos del elemento
 */
function cantidadHijos(id) {

  return obtenerElementoPorId(id).childElementCount;

}



/**
 * Abre un modal mostrando un mensaje con el estado de la peticion al servidor
 * @param {Boolean} ok Booleano que indica si la peticion fue exitosa o no
 * @param {*} mensaje El mensaje de exito o no de la peticion que contiene la respuesta
 */
function mostrarMensaje(ok, mensaje) {
  const myModal = new bootstrap.Modal(obtenerElementoPorId('modal-mensaje'), {});
  if (ok) {
    mensajeExito(mensaje);
    myModal.show();
  }
  else {
    mensajeError(mensaje);
    myModal.show();
  }
}



/**
 * 
 * @param {String} mensaje Es el mensaje a mostrar en el modal
 */
function mensajeError(mensaje) {
  const cartel = obtenerElementoPorId("mensaje");

  quitarClaseSuccess(cartel);
  agregarClaseDanger(cartel);

  cartel.innerHTML = mensaje;
}



/**
 * 
 * @param {String} mensaje Es el mensaje a mostrar en el modal
 */
function mensajeExito(mensaje) {
  const cartel = obtenerElementoPorId("mensaje");

  quitarClaseDanger(cartel);
  agregarClaseSuccess(cartel);

  cartel.innerHTML = mensaje;
}


/**
 * Agrega a un elemento html la clase 'text-success'
 * @param {HTMLElement} elemento El elemento a agregarle la clase
 */
function agregarClaseSuccess(elemento) {
  elemento.classList.add("text-success");
}



/**
 * Remueve a un elemento html la clase 'text-success'
 * @param {HTMLElement} elemento El elemento a removerle la clase
 */
function quitarClaseSuccess(elemento) {
  elemento.classList.remove("text-success");
}



/**
 * Agrega a un elemento html la clase 'text-danger'
 * @param {HTMLElement} elemento El elemento a agregarle la clase
 */
function agregarClaseDanger(elemento) {
  elemento.classList.add("text-danger");
}



/**
 * Remueve a un elemento html la clase 'text-danger'
 * @param {HTMLElement} elemento El elemento a removerle la clase
 */
function quitarClaseDanger(elemento) {
  elemento.classList.remove("text-danger");
}



/**
 * Obtiene el nombre del recurso
 * @returns {String} Devuelve el nombre del recurso
 */
function obtenerNombreDelRecurso() {

  return document.getElementsByTagName("h1").item(0).innerHTML.split(" ").pop();

}



/**
 * Recarga la pagina si el recurso se borro con exito
 */
function recargar() {

  if (obtenerElementoPorId("mensaje").classList.contains("text-success")) {
    window.location.reload();
  }
  
}



/**
 * Captura los inputs de los formularios de crear y editar una instancia de un recurso
 * @returns {HTMLCollection} Devuelva una lista con los inputs del formulario
 */
function obtenerInputsFormulariosCrearEditar() {

  const inputs = [...document.getElementsByTagName("input")].filter(i => i.type !== "hidden");
  const select = [...document.getElementsByTagName("select")];
  inputs.push(...select);

  return inputs;

}



/**
 * Captura los nombre y valores de los atributos de los formularios de crear y editar una instancia de un recurso
 * @param {HTMLCollection} inputs La lista con los inputs del formulario
 * @returns {Array} Devuelve un objeto con los atributos y sus valores
 */
function obtenerDatosFormulariosCrearEditar(inputs) {
  const datos = {};

  inputs.forEach(i => {
    const nombre = i.parentElement.previousSibling.previousSibling.getAttribute("for");
    const valor = i.type === "checkbox" ? i.checked : i.value;

    datos[`${nombre}`] = valor;
  });

  return datos;
}



/**
 * Captura el campo hidden del formulario de editar y devuelve su valor
 * @returns {String} Devuelve la id de la instancia del recurso
 */
function obtenerIdDelCampoHidden() {
  return document.querySelector('[type="hidden"]').value;
}



export {
  ocultarElemento,
  mostrarElemento,
  cantidadHijos,
  obtenerElementoPorId,
  bloquearEspacios,
  mostrarMensaje,
  obtenerNombreDelRecurso,
  recargar,
  obtenerInputsFormulariosCrearEditar,
  obtenerDatosFormulariosCrearEditar,
  obtenerIdDelCampoHidden
}