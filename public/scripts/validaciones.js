import { mostrarElemento, ocultarElemento } from "./frontUtils.js";

const LONGITUD_LIMITE = 50;



/**
 * validaciones del campo 'email'
 * @param {String} idInputEmail La id del input a validar
 * @param {String} idCartel La id del elemento que mostrara el mensaje en caso de error
 * @returns {Boolean} true si esta todo ok, si no, false
 */
function validarEmail(idInputEmail, idCartel) {

  const emailInput = document.getElementById(idInputEmail);
  inputValido(emailInput);
  ocultarElemento(idCartel);

  const email = emailInput.value;

  if (inputVacio(emailInput)) {
    inputInvalido(emailInput);
    mensajeInputInvalido(idCartel, "Debe ingresar un e-mail.");
    return false;
  }

  if (!formatoEmailValido(email)) {
    inputInvalido(emailInput);
    mensajeInputInvalido(idCartel, "El formato del e-mail no es correcto.");
    return false;
  }

  // if (logitudMayorALimite(email)) {
  //   inputInvalido(emailInput);
  //   mensajeInputInvalido(idCartel, "El e-mail es muy largo.");
  //   return false;
  // }

  return true;

}



/**
 * validaciones del campo 'password'
 * @param {String} idInputPassword La id del input a validar
 * @param {String} idCartel La id del elemento que mostrara el mensaje en caso de error
 * @returns {Boolean} true si esta todo ok, si no, false
 */
function validarContraseña(idInputPassword, idCartel) {

  const passwordInput = document.getElementById(idInputPassword);
  inputValido(passwordInput);
  ocultarElemento(idCartel);

  const password = passwordInput.value;

  if (inputVacio(passwordInput)) {
    inputInvalido(passwordInput);
    mensajeInputInvalido(idCartel, "Debe ingresar una contraseña.");
    return false;
  }

  if (logitudMayorALimite(password)) {
    inputInvalido(passwordInput);
    mensajeInputInvalido(idCartel, "La contraseña es muy larga.");
    return false;
  }

  return true;

}



/**
 * validaciones del campo 'nombre'
 * @param {String} idInputNombre La id del input a validar
 * @param {String} idCartel La id del elemento que mostrara el mensaje en caso de error
 * @returns {Boolean} true si esta todo ok, si no, false
 */
function validarNombre(idInputNombre, idCartel) {

  const nombreInput = document.getElementById(idInputNombre);
  if (!nombreInput) return true;
  inputValido(nombreInput);
  ocultarElemento(idCartel);

  const nombre = nombreInput.value;

  if (inputVacio(nombreInput)) {
    inputInvalido(nombreInput);
    mensajeInputInvalido(idCartel, "Por favor, ingrese su nombre.");
    return false;
  }

  if (logitudMayorALimite(nombre)) {
    inputInvalido(nombreInput);
    mensajeInputInvalido(idCartel, "El nombre es muy largo.");
    return false;
  }

  return true;

}



/**
 * Checkea si un input esta vacio
 * @param {HTMLElement} input Elemento a checkear
 * @returns {Boolean} true si esta vacio, si no, false
 */
function inputVacio(input) {

  return input.value.trim().length === 0;

}



/**
 * Verifica si la longitud del valor ingresado en un input es mayor al limite permitido
 * @param {String} cadena Cadena a verificar la longitud
 * @param {Number} limite Longitud maxima permitida
 * @returns {Boolean} false si la longitud de la cadena es mayor al limite
 */
function logitudMayorALimite(cadena) {

  return cadena.length > LONGITUD_LIMITE;

}



/**
 * Verifica que un email tenga el formato correcto
 * @param {String} email El email que se quiere verificar si esta en un formato correcto
 * @returns {Boolean} true si es valido
 */
function formatoEmailValido(email) {
  // https://www.w3.org/TR/2012/WD-html-markup-20120329/input.email.html
  const regexW3 = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  return regexW3.test(email);
}



/**
 * Muestra un mensaje con el error en un input invalido
 * @param {String} cartel id del elemento que muestra el mensaje
 * @param {String} mensajeError El mensaje a mostrar
 */
function mensajeInputInvalido(cartel, mensajeError) {

  document.getElementById(cartel).innerHTML = mensajeError;
  mostrarElemento(cartel);

}



/**
 * Agrega estilos a un input que no es valido
 * @param {HTMLElement} input Elemento input que no es valido
 */
function inputInvalido(input) {

  input.classList.add("is-invalid");

}



/**
 * Quita los estilos a n input que tiene los estilos de invalido
 * @param {HTMLElement} input Elemento input que ahora es valido
 */
function inputValido(input) {

  input.classList.remove("is-invalid");

}



/**
 * Muestra un mensaje se error en el input del nombre del recurso
 * @param {HTMLElement} inputNombreRecurso El input donde se carga el nombre del recurso
 * @param {String} idCartel La id del div que muestra el error del input
 * @param {String} msjError El mensaje de error a mostrar
 */
function mostrarDivErrorInput(inputNombreRecurso, idCartel, msjError) {
  let cartel = inputNombreRecurso.nextSibling;

  if (cartel.nodeName === "#text") {
    cartel = cartel.nextSibling;
  }

  cartel.innerHTML = msjError;
  mostrarElemento(idCartel);
}



/**
 * Comprueba que no haya campos vacios antes de realizar laa peticion
 * Los inputs type checkbox los ignora y toma solo en cuenta a los inputs type text, number y campos select
 * @param {HTMLCollection} inputs Array con los elementos inputs del formulario
 * @returns {Boolean} Devuelve true si hay campos vacios
 */
function camposVacios(inputs) {
  const filtroCheckbox = inputs.filter(i => i.type !== "checkbox");
  const filtroVacios = filtroCheckbox.filter(i => i.value.length > 0);

  return filtroCheckbox.length != filtroVacios.length;
}



/**
 * Valida que una cadena de caracteres contenga solo caracteres alfabeticos y el guion bajo
 * @param {String} cadena La cadena de caracteres a validar
 * @returns {Boolean} true si la cadena es correcta
 */
function caracteresCorrectos(cadena) {
  const regex = /^[A-Za-z_]+$/;
  return regex.test(cadena);
}



export {
  validarContraseña,
  validarNombre,
  validarEmail,
  inputVacio,
  logitudMayorALimite,
  mensajeInputInvalido,
  inputInvalido,
  inputValido,
  formatoEmailValido,
  camposVacios,
  caracteresCorrectos,
  mostrarDivErrorInput
}