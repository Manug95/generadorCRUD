import { validarContraseña, validarEmail } from "./validaciones.js";
import { obtenerElementoPorId } from "./frontUtils.js";
import { enviarPOST } from "./enviar.js";

//add eventos submit
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("password-log").addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      login();
    }
  });

  document.getElementById("btn-login").addEventListener("click", login);
});



/**
 * revisa que esta todo ok antes de hacer el submit de los datos
 */
function login() {
  if (validarEmail("email", "emailInfo") && validarContraseña("password-log", "passwordInfo")) {
    const datosLogin = {
      email: obtenerEmail(),
      contrasenia: obtenerContrasenia()
    }

    submitLogin(datosLogin);
  }
}



/**
 * realiza la accion de enviar los datos al servidor
 * @param {Object} datosLogin El objeto con los datos del formulario del login
 */
async function submitLogin(datosLogin) {

  await enviarPOST("./autenticar", datosLogin);

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

  return obtenerElementoPorId("password-log").value;

}