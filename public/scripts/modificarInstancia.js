import { obtenerElementoPorId } from "../../scripts/frontUtils.js";
import { enviarPUT } from "./enviar.js";
import { mostrarMensaje, obtenerDatosFormulariosCrearEditar, obtenerInputsFormulariosCrearEditar, obtenerIdDelCampoHidden } from "./frontUtils.js";
import { camposVacios } from "./validaciones.js";

document.addEventListener("DOMContentLoaded", () => {
  obtenerElementoPorId("btn-actualizar").addEventListener("click", enviarInstanciaDeñRecursoActualizada);
})

async function enviarInstanciaDeñRecursoActualizada() {

  const inputs = obtenerInputsFormulariosCrearEditar();

  if (!camposVacios(inputs)) {
    const datos = obtenerDatosFormulariosCrearEditar(inputs);

    const id = obtenerIdDelCampoHidden();

    await enviarPUT(`../${id}`, datos);
  }
  else {
    mostrarMensaje(false, "Hay campos vacios en el formulario");
  }

}