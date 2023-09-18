import { validarContraseña, validarEmail, validarNombre } from "./validaciones.js";
import { obtenerElementoPorId } from "./frontUtils.js";
import { enviarPOST } from "./enviar.js";

//add eventos submit
document.addEventListener("DOMContentLoaded", () => {
  obtenerElementoPorId("btn-register").addEventListener("click", register);
});



/**
 * revisa que esta todo ok antes de hacer el submit de los datos
 */
function register() {
  if (validarEmail("email", "emailInfo") && validarContraseña("password-reg", "passwordInfo") && validarNombre("nombre", "nombreInfo")) {
    const datosRegistro = {
      email: obtenerEmail(),
      contrasenia: obtenerContrasenia(),
      nombreUsuario: obtenerNombre()
    }

    submitRegister(datosRegistro);
  }
}



/**
 * realiza la accion de enviar los datos al servidor
 * @param {Object} datosRegistro El objeto con los datos del formulario de registro
 */
async function submitRegister(datosRegistro) {

  await enviarPOST("./nuevo", datosRegistro);

}



/**
 * @returns Devuelve el email ingresado en el campo Email
 */
function obtenerEmail() {

  return obtenerElementoPorId("email").value;

}



/**
 * @returns Devuelve la contraseña ingresado en el campo de la Contraseña
 */
function obtenerContrasenia() {

  return obtenerElementoPorId("password-reg").value;

}



/**
 * @returns Devuelve el nombre ingresado en el campo Nombre
 */
function obtenerNombre() {

  return obtenerElementoPorId("nombre").value;

}