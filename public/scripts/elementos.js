import { cantidadHijos } from "./frontUtils.js"


/**
 * Crea un elemento div con las clases que le son especificadas
 * @param  {...any} clases Las clases a agregarle al div creado
 * @returns {HTMLDivElement} el nuevo elemento div
 */
function crearDiv(...clases) {
  const div = document.createElement("div");

  clases.forEach(clase => {
    div.classList.add(clase);
  });

  return div;
}



/**
 * Crea un elemento input type text con la clase 'form-control' y la id que se le pasa
 * @returns {HTMLInputElement} el nuevo input type text
 */
function crearInputText(id) {
  const input = document.createElement("input");

  input.setAttribute("type", "text");
  input.setAttribute("id", id);
  input.classList.add("form-control");

  return input;
}



/**
 * Crea un elemento input type checkbox con la clase 'form-check-input' con su
 * id, name y value especificados
 * @param {String} id La id que tendra el checkbox
 * @param {String} name El name que tendra el checkbox
 * @param {String} value El valor que tendra el checkbox
 * @returns {HTMLInputElement} el nuevo elemento checkbox
 */
function crearInputCheckbox(id, name, value) {
  const checkbox = document.createElement("input");

  checkbox.setAttribute("type", "checkbox");
  checkbox.setAttribute("id", id);
  checkbox.setAttribute("name", name);
  checkbox.setAttribute("value", value);
  checkbox.classList.add("form-check-input");
  
  return checkbox;
}



/**
* Crea un elemento label con la clase 'form-label'
* @param {String} _for Valor del atributo for el label
* @param {String} text Texto del contenido del label
* @returns {HTMLLabelElement} el nuevo elemento label
*/
function crearLabel(_for, text) {
  const label = document.createElement("label");

  label.classList.add("form-label");
  label.setAttribute("for", _for);
  label.innerHTML = text;

  return label;
}



/**
* Crea un elemento select con una determinada id y una serie de valores
* @param {String} id La id que tendra el elemento
* @param {Array} optionValues Arreglo de objetos con el texto y values que tendran los options del select
* @returns {HTMLSelectElement} el nuevo elemento select
*/
function crearSelect(id, optionValues, ...clases) {
  const select = document.createElement("select");

  // select.classList.add("form-select");
  clases.forEach(clase => select.classList.add(clase));
  select.setAttribute("id", id);

  select.appendChild(crearOptionSelect("Seleccione el tipo de dato", "", "selected", "disabled"));
  optionValues.forEach(o => {
      select.appendChild(crearOptionSelect(o.text, o.value));
  });

  return select;
}



/**
* Crea un elemento option para un combo select
* @param {String} text Contenido del option
* @param {String} value Contenido del atributo value del option
* @param {...any} opciones atributos opcionales como 'selected' o 'disabled'
* @returns {HTMLOptionElement} el nuevo elemento option
*/
function crearOptionSelect(text, value, ...opciones) {
  const option = document.createElement("option");

  option.setAttribute("value", value);
  option.innerHTML = text;
  
  if (opciones.length > 0) {
      opciones.forEach(o => {
          option.setAttribute(o, "");
      });
  }

  return option;
}



/**
 * Crea un elemento li 
 * @param {String} text El contenido que tendra el elemento
 * @param  {...String} clases La lista de clases que tendra el elemento
 * @returns {HTMLLIElement} el nuevo elemento li
 */
function crearLI(text, ...clases) {
  const li = document.createElement("li");

  clases.forEach(clase => li.classList.add(clase));

  //REFACTORIZAR
  li.classList.add("d-flex", "justify-content-between", "align-items-center", "p-0");
  li.innerHTML = `<span class="ms-5">${text.toUpperCase()}</span>` + '<button id="btn-del-enum" class="p-0 me-5"><i class="bi bi-x"></i></button>';

  return li;
}



/**
 * Crea un elemento button con la id y clases especificadas
 * @param {String} id La id que tendra el boton
 * @param  {...String} clases La lista de clases que tendra
 * @returns {HTMLButtonElement} el nuevo elemento button 
 */
function craerBoton(id, ...clases) {
  const boton = document.createElement("button");

  boton.setAttribute("type", "button");
  boton.setAttribute("id", id);
  clases.forEach(clase => boton.classList.add(clase));
  

  return boton;
}



/**
 * Crea un elemento div que contendra el boton para borrar la fila del input text y el select del tipo de dato
 * @returns el nuevo elemento div con el boton para borrar la fila
 */
function crearDivBotonBorrar() {
  const div = crearDiv("col-2", "col-md-2", "d-flex", "justify-content-center", "align-items-end", "mt-4", "p-0");

  const boton = craerBoton("btn-del", "mt-4");
  boton.innerHTML = '<i class="bi bi-x-lg"></i>';

  boton.addEventListener("click", borrarFila);

  div.appendChild(boton);

  return div;
}



/**
 * Manejador del evento 'click' del boton que borra su fila
 * @param {Event} event 
 */
function borrarFila(event) {
  let fila = event.target.parentNode.parentNode;
  
  if (event.target.tagName === "I") {
    fila = fila.parentNode;
  }
  
  const contenedorFilas = fila.parentNode;
  contenedorFilas.removeChild(fila);
}



/**
 * Crea un elemento div que contendra al input type text para el nuevo campo, y su correspondiente label
 * @returns {HTMLDivElement} el nuevo div con su input y label
 */
function crearDivInputText() {
  const div = crearDiv("col-8", "col-md-4", "p-0", "mt-3");

  const idInput = generarIdInputDeLosCampos();

  div.appendChild(crearLabel(idInput, "Campo"));
  div.appendChild(crearInputText(idInput));
  div.appendChild(crearDivErrorInput(`${idInput}-text-info`, "form-text", "text-danger", "d-none"));

  return div;
}



/**
 * Crea un elemento div que contendra al input select de los tipos de datos, con su correspondiente label
 * @returns {HTMLDivElement} el nuevo elemento
 */
function crearDivSelectTipoDeDato() {
  const div = crearDiv("col-8", "col-md-4", "p-0", "mt-3");

  const values = [
    { text: "Number", value: "number" },
    { text: "Varchar(50)", value: "string" },
    { text: "Boolean", value: "boolean" },
    { text: "Enum", value: "enum" }
  ];

  const idInput = generarIdSelectTipoDeDato();

  div.appendChild(crearLabel(idInput, "Tipo de Dato"));
  div.appendChild(crearSelect(idInput, values, "form-select", "tipos-datos"));
  div.appendChild(crearDivErrorInput(`${idInput}-select-info`, "form-text", "text-danger", "d-none"));

  return div;
}



/**
 * Crea un elemento div para mostrar los errores que pueden tener los inputs
 * @param {String} id La id que tendra el elemento
 * @param  {...String} clases Las clases que tendra el elemento
 * @returns el nuevo elemento div
 */
function crearDivErrorInput(id, ...clases) {
  const div = crearDiv(...clases);

  div.setAttribute("id", id);

  return div;
}



/**
 * Genera una id en base a la cantidad de elementos hijos que tiene el elemento padre del input
 * @returns {String} La id que tendra el campo
 */
function generarIdInputDeLosCampos() {

  return `campo-${cantidadHijos("row-campos") + 1}`;

}



/**
 * Genera una id en base a la cantidad de elementos hijos que tiene el elemento padre del select
 * @returns La id que tendra el select del tipo de dato
 */
function generarIdSelectTipoDeDato() {

  return `tipo-${cantidadHijos("row-campos") + 1}`;

}

export {
  crearDiv,
  crearInputText,
  crearLabel,
  crearOptionSelect,
  crearSelect,
  crearInputCheckbox,
  crearDivInputText,
  crearDivSelectTipoDeDato,
  crearDivBotonBorrar,
  crearLI,
  crearDivErrorInput
};