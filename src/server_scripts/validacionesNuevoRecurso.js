const { existsSync } = require("fs");
const { capitalizar } = require("./generarArchivos");


const LONGITUD_LIMITE = 50;


/**
 * Filtro que arroja un error si falta alguno de los datos para crear el nuevo recurso
 * @param {*} atributos Los atributos del nuevo recurso
 * @param {*} nombre El nombre del nuevo recurso
 * @param {*} usuariosConPermisos El array con los usuarios que tiene permisos sobre el nuevo recurso
 * @throws {Error} Arroja un error con el correspondiente mensaje segun el dato que falte
 */
function rechazarSiFaltanDatos(atributos, nombre, usuariosConPermisos) {
  if (existsSync(`src/modelos/modelos_dinamicos/${capitalizar(nombre)}.model.js`)) {
    throw new Error("El recurso ya existe");
  }
  if (usuariosConPermisos.length === 0) {
    throw new Error("No hay usuarios con permisos");
  }
  if (atributos.length === 0) {
    throw new Error("El recurso debe de tener al menos un atributo");
  }
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



/**
 * 
 * @param {Array} arregloAtributos 
 */
function ValidarNombresAtributos(arregloAtributos) {
  const atributos = arregloAtributos.map(a => a[0]);

  const losQueTienenErrores = atributos.filter(a => !caracteresCorrectos(a));

  if (losQueTienenErrores.length > 0) {
    throw new Error(`Los nombres de los atributos ${losQueTienenErrores.join(", ")} no son correctos`);
  }
}




/**
 * Valida que el nombre del recurso nuevo sea corracto
 * @param {String} nombre El nombre del recurso
 * @throws {Error} Arroja un error con un mensaje si no pasa la validacion
 */
function validarNombre(nombre) {
  validarLongitud(nombre);

  if (!caracteresCorrectos(nombre)) {
    throw new Error("El nombre del recurso tiene caracteres invalidos");
  }
}



/**
 * Valida que la longitud de un string no sea 0 y ni mayor a 30
 * @param {String} value Lo que hay que validar
 * @throws {Error} Arroja un error con un mensaje si no pasa la validacion
 */
function validarLongitud(value) {
  if (value.length === 0){
    throw new Error(`El nombre del recurso es obligatorio`);
  }
  if (value.length > LONGITUD_LIMITE) {
    throw new Error(`El nombre del recurso supera el limite de 30 caracteres`);
  }
}



module.exports = {
  rechazarSiFaltanDatos,
  validarNombre,
  ValidarNombresAtributos
}