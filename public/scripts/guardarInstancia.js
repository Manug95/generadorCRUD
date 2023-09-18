import { obtenerElementoPorId } from "../../scripts/frontUtils.js";
import { enviarPOST } from "./enviar.js";
import { mostrarMensaje, obtenerDatosFormulariosCrearEditar, obtenerInputsFormulariosCrearEditar } from "./frontUtils.js";
import { camposVacios } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  obtenerElementoPorId("btn-crear").addEventListener("click", enviarNuevaInstanciaDelRecurso);
})

async function enviarNuevaInstanciaDelRecurso() {

  const inputs = obtenerInputsFormulariosCrearEditar();

  if (!camposVacios(inputs)) {

    const datos = obtenerDatosFormulariosCrearEditar(inputs)

    await enviarPOST("./", datos);

  }
  else {
    mostrarMensaje(false, "Hay campos vacios en el formulario");
  }

}