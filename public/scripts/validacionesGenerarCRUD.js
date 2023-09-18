import { inputVacio, logitudMayorALimite, caracteresCorrectos, mostrarDivErrorInput } from "./validaciones.js";
import * as utils from "./frontUtils.js";



/**
 * Valida que no haya errores en el nombre del nevo recurso
 * @returns {Boolean} true si no hay errores en el input
 */
function validarNombreRecurso() {
  utils.ocultarElemento("nombre-recurso-info");
  const inputNombreRecurso = utils.obtenerElementoPorId("nombre-recurso");

  if (inputVacio(inputNombreRecurso)) {
    mostrarDivErrorInput(inputNombreRecurso, "nombre-recurso-info", "Ingrese un nombre al recurso");
    return false;
  }

  if (!caracteresCorrectos(inputNombreRecurso.value)) {
    mostrarDivErrorInput(inputNombreRecurso, "nombre-recurso-info", "Solo letras mayusculas, minusculas y guión bajo '_'");
    return false;
  }

  if (logitudMayorALimite(inputNombreRecurso.value)) {
    mostrarDivErrorInput(inputNombreRecurso, "nombre-recurso-info", "Nombre del recurso demasiado largo")
    return false;
  }

  return true;
}



/**
 * Valida que todos los campos de los atributos del recurso sean correctos
 * @param {Map} mapaEnums Mapa con los valores de los enums
 * @returns {Boolean} true si todos los campos son correctos
 */
function validarAtributos(mapaEnums) {
  const filasCamposDelRecurso = obtenerLasFilasDeLosCampos();

  if (filasCamposDelRecurso.length === 0) {

    utils.mostrarMensaje(false, "El recurso debe de tener al menos un atributo");
    return false;

  }

  return filasCamposDelRecurso.every(fila => {
    const inputNombreAtributo = fila.firstChild.lastChild.previousSibling;
    const selectTipoDeDato = fila.firstChild.nextSibling.lastChild.previousSibling;

    return validarFila(inputNombreAtributo, selectTipoDeDato, mapaEnums);
  });
 
}



/**
 * Valida el nuevo atributo que consta del nombre de este con su tipo de dato
 * @param {HTMLInputElement} inputNombreAtributo 
 * @param {HTMLSelectElement} selectTipoDeDato 
 * @param {Map} mapaEnums Mapa con los valores de los enums
 * @returns {Boolean} true si los campos de la fila son correctos
 */
function validarFila(inputNombreAtributo, selectTipoDeDato, mapaEnums) {

  return validarNombreAtributo(inputNombreAtributo) && validarSelectTipoDeDato(selectTipoDeDato, mapaEnums);

}



/**
 * Valida el input del nombre del nuevo atributo (campos)
 * @param {HTMLInputElement} input El input del campo a validar
 * @returns {Boolean} true si el campo tiene un valor correcto
 */
function validarNombreAtributo(input) {
  utils.ocultarElemento(`${input.id}-text-info`);

  const nombreCampo = input.value;

  if (!caracteresCorrectos(nombreCampo)) {
    mostrarDivErrorInput(input, `${input.id}-text-info`, "Solo letras mayusculas, minusculas y guión bajo '_'");
    return false;
  }

  if (logitudMayorALimite(nombreCampo)) {
    mostrarDivErrorInput(input, `${input.id}-text-info`, "Nombre atributo desamisado largo");
    return false;
  }

  return true;
}

/**
 * Funcion que comprueba si el input del nombre del atributo tipo enum esta vacio
 * @param {HTMLSelectElement} inputEnums El elemento Select que tiene
 * @returns {Boolean} true si el atributo no tiene nombre
 */
function nombreCampoTipoEnumVacio(inputEnums) {  
  const campoNombre = inputEnums.parentNode.previousSibling.firstChild.nextSibling;

  utils.ocultarElemento(`${campoNombre.id}-text-info`);

  if (campoNombre.value.length === 0) {
    inputEnums.value = "";
    mostrarDivErrorInput(campoNombre, `${campoNombre.id}-text-info`, "Atributo sin nombre");
    return true;
  }
  return false;
}



/**
 * Valida el select de dito de dato del nuevo atributo
 * @param {HTMLSelectElement} select El selecto del campo a validar
 * @param {Map} mapaEnums Mapa con los valores de los enums
 * @returns {Boolean} true si el valor sel select es correcto
 */
function validarSelectTipoDeDato(select, mapaEnums) {
  const idDivError = `${select.id}-select-info`;
  utils.ocultarElemento(idDivError);

  const tipoDeDato = select.value;

  if (tipoDeDato.length === 0) {
    mostrarDivErrorInput(select, idDivError, "Elija un tipo de dato");
    return false;
  }

  if (tipoDeDato === "enum") {
    const idDivErrorNombre = `campo-${idDivError.split("-")[1]}-text-info`;
    const campoEnum = utils.obtenerElementoPorId(idDivErrorNombre).previousSibling.value;
    if (!mapaEnums.get(campoEnum)) {
      select.value = "";
      mostrarDivErrorInput(select, idDivError, " Campo ENUM sin valores");
      return false;
    }
  }

  return true;
}



/**
 * Verifica si hay algun permiso seleccionado en algun usuario
 * @param {Array} usuariosConPermisos Arreglo con los usuarios que tienen algun permiso sobre el recurso
 * @returns {Boolean} true si hay almenos un usuario en el arreglo
 */
function hayUsuariosConPermisos(usuariosConPermisos) {
  if (usuariosConPermisos.length === 0) {
    utils.mostrarMensaje(false, "No hay usuarios con permisos");
    return false;
  }

  return true;
}



/**
 * Recupera la los divs que hacen de fila para agregar los campos al recurso
 * @returns {HTMLElement[]} la lista de las filas
 */
function obtenerLasFilasDeLosCampos() {

  const filas = utils.obtenerElementoPorId("row-campos");
  return [...filas.children].filter(elem => elem.firstChild.lastChild.previousSibling.value.length > 0);

}




export {
  validarNombreRecurso,
  validarAtributos,
  obtenerLasFilasDeLosCampos,
  hayUsuariosConPermisos,
  nombreCampoTipoEnumVacio
}