const { INTEGER, STRING, BOOLEAN, ENUM } = require("sequelize");


/**
 * Valida que la longitud de un string no sea 0 y ni mayor a 50
 * @param {String} campo Es el nombre del atributo a validar
 * @param {String} value Lo que hay que validar
 * @throws {Error} Arroja un error con un mensaje si no pasa la validacion
 */
function validarLongitud(campo, value) {
  if (value.length === 0){
    throw new Error(`El campo ${campo} no puede estar vacío`);
  }
  if (value.length > 50) {
    throw new Error(`El campo ${campo} supera el limite de 50 caracteres`);
  }
}



/**
 * Valida que no falten datos del usuario
 * @param {Object} datos Los datos del usuario
 * @throws {Error} Arroja un error con un mensaje si no pasa la validacion
 */
function datosUsuarioIncompletos(datos) {
  if (datos.nombreUsuario.length === 0) {
    throw new Error("Se requiere un nombre de usuario");
  }
  if (datos.contrasenia.length === 0) {
    throw new Error("Se requiere una contraseña");
  }
  if (datos.email.length === 0) {
    throw new Error("Se requiere un email");
  }
}



/**
 * Valida que no falten datos del login
 * @param {Object} datos Los datos del login del usuario
 * @throws {Error} Arroja un error con un mensaje si no pasa la validacion
 */
function datosIncompletosLogin(datos) {
  if (datos.contrasenia.length === 0) {
    throw new Error("Se requiere una contraseña");
  }
  if (datos.email.length === 0) {
    throw new Error("Se requiere un email");
  }
}



/**
 * Valida que una cadena de texto contenga solo numeros
 * @param {String} n La cadena a validar
 * @returns Devuelve true si la cadena es numerica
 */
function esNumero(n) {

  const regex = /^[0-9]+$/;
  return regex.test(n);

}



/**
 * Funcion validadora para las id de los parametros de las rutas
 * @param {String} id La id del parametro a validar
 * @throws Arroja un error si la id no pasa la validacion
 */
function validarParametroID(id) {

  if (!esNumero(id)) {
    throw new Error("La ID pasada no es un numero valido");
  }

}



function tipoDatoParaLosFormInputs(tipo) {
  if (tipo instanceof INTEGER) {
    return "number";
  }
  if (tipo instanceof STRING) {
    return "text";
  }
  if (tipo instanceof BOOLEAN) {
    return "checkbox";
  }
  if (tipo instanceof ENUM) {
    return "enum";
  }
}



module.exports = {
  validarLongitud,
  validarParametroID,
  tipoDatoParaLosFormInputs,
  datosUsuarioIncompletos,
  datosIncompletosLogin
}