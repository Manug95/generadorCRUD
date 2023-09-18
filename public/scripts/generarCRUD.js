import * as elementos from "./elementos.js";
import { obtenerElementoPorId, bloquearEspacios } from "./frontUtils.js";
import { validarAtributos, validarNombreRecurso, hayUsuariosConPermisos, obtenerLasFilasDeLosCampos, nombreCampoTipoEnumVacio } from "./validacionesGenerarCRUD.js";
import { enviarPOST } from "./enviar.js";

const TIPOS_PERMISOS = ["consultar", "crear", "modificar", "eliminar"];
var usuariosRecuperados = [];
var mapaEnums = new Map();



/**
 * Agrega eventos a los elementos al cargarse el documento
 */
document.addEventListener("DOMContentLoaded", () => {
  obtenerElementoPorId("btn-add").addEventListener("click", nuevoCampo);

  obtenerElementoPorId("usuarios").addEventListener("change", crearDivCheckboxDePermisos);

  obtenerElementoPorId("btn-generarcrud").addEventListener("click", generarRecurso);

  obtenerElementoPorId("btn-add-enum").addEventListener("click", addEnumALaLista);

  obtenerElementoPorId("input-enum").addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addEnumALaLista();
    }
  });

  obtenerElementoPorId("nombre-recurso").addEventListener("keypress", bloquearEspacios);

  nuevoCampo();

  traerUsuarios();
});



/**
 * Valida que esten todos los campos bien, y de ser asi, crea un objeto con los datos del recurso y lo envia al servidor
 */
function generarRecurso() {
  const usuariosConPermisos = obtenerUsuariosConPermisos();

  if (validarNombreRecurso() && validarAtributos(mapaEnums) && hayUsuariosConPermisos(usuariosConPermisos)) {
    const recurso = {};

    recurso.nombreRecurso = obtenerNombreDelRecurso();
    recurso.atributos = obtenerAtributos();
    recurso.usuariosConPermisos = usuariosConPermisos;

    enviarRecurso(recurso);
  }
}



/**
 * Envia el recurso nuevo al servidor
 * @param {Object} recurso recibe el objeto del recurso armado para ser enviado al servidor
 */
async function enviarRecurso(recurso) {

  await enviarPOST("generarCRUD/nuevoRecurso", recurso);

}



/**
 * Filtra los usuarios con permisos del array donde estan todos los usuarios
 * @returns {Array} Devuelva un array con los usuario a los que se les puso algun permiso
 */
function obtenerUsuariosConPermisos() {

  return usuariosRecuperados.filter(u => u.permisos.length > 0);

}



/**
 * Captura el valor del input del nnombre del recurso
 * @returns {String} Devuelva el valor del input del nombre del recurso
 */
function obtenerNombreDelRecurso() {

  return obtenerElementoPorId("nombre-recurso").value;

}



/**
 * Captura los valores de los inputs de los atributos
 * @returns {any[any[]]} Devuelva un array de arrays con los nombres de los atributos y sus tipos de datos
 */
function obtenerAtributos() {
  const filas = obtenerLasFilasDeLosCampos();

  const datos = filas.map(fila => {
    const nombreAtributo = fila.firstChild.lastChild.previousSibling.value;
    let tipoDeDato = fila.firstChild.nextSibling.lastChild.previousSibling.value;

    if (tipoDeDato === "enum") {
      tipoDeDato = mapaEnums.get(nombreAtributo);
    }

    return [nombreAtributo, tipoDeDato];

  });

  return datos;
}



/**
 * Solicita todos los usuarios al servidor
 */
function traerUsuarios() {
  fetch("/usuarios/listar")
    .then(response => response.json())
    .then(data => {
      const selectUsuarios = document.getElementById("usuarios");
      data.body.forEach(user => {
        selectUsuarios.appendChild(elementos.crearOptionSelect(user.userName, user.id));
      });
      usuariosRecuperados.push(...data.body);
    })
    .catch(error => console.log(error));
}



/**
 * Crea el div contenedor de los inputs para poder crear una atributo nuevo al recurso
 */
function nuevoCampo() {
  const div = elementos.crearDiv("row", "flex-column", "flex-md-row", "align-items-center", "justify-content-md-evenly");

  const inputText = elementos.crearDivInputText();
  inputText.addEventListener("keypress", bloquearEspacios);
  div.appendChild(inputText);

  const selectTipoDeDato = elementos.crearDivSelectTipoDeDato();
  selectTipoDeDato.addEventListener("change", (e) => {
    if (e.target.value === "enum"){
      abrirModalEnums(e);
    }
  });
  div.appendChild(selectTipoDeDato);

  div.appendChild(elementos.crearDivBotonBorrar());

  const elemPadre = document.getElementById("row-campos");
  elemPadre.appendChild(div);
}



/**
 * Crea un elemento div que contendra los inputs checkbox de los permisos, con sus correspondientes labels
 * @returns {HTMLDivElement} el nuevo elemento div con sus elementos
 */
function crearDivCheckboxDePermisos() {
  const contenedorCheckboxes = document.getElementById("div-permisos");

  contenedorCheckboxes.innerHTML = "";

  TIPOS_PERMISOS.forEach(permiso => {
    contenedorCheckboxes.appendChild(crearDivCheckbox(permiso));
  });

}



/**
 * Crea un elemento div con un input type checkbox con su label
 * @param {String} permiso 
 * @returns el nuevo elemento div con su checkbox
 */
function crearDivCheckbox(permiso) {
  const div = elementos.crearDiv("form-check", "form-check-inline", "mt-1", "mt-md-0");

  div.appendChild(elementos.crearLabel(permiso, permiso));

  const checkbox = elementos.crearInputCheckbox(permiso, "permisos", permiso);

  if (trearUsuarioSeleccionado().permisos.includes(permiso)) {
    checkbox.setAttribute("checked", "");
  }
  checkbox.addEventListener("change", modificarPermisos);

  div.appendChild(checkbox);

  return div;
}



/**
 * Manejador del evento 'change' de los checkbox
 * Si se selecciona el checkbox se agrega el permiso correspondiente al usuario seleccionado, 
 * si se quita la seleccion, se quita el permiso
 * @param {Event} event 
 */
function modificarPermisos(event) {
  const usuario = indiceUsuarioSeleccionado();

  const checkboxValue = event.target.value; //el permiso seleccionado

  if (event.target.checked) {
    agregarPermisoAlUsuarioSeleccionado(usuario, checkboxValue);
  }
  else {
    quitarPermisoAlUsuarioSeleccionado(usuario, checkboxValue);
  }

}



/**
 * Trae el 'value' del usuario seleccionado, que es la id del usuario
 * @returns {String} La id del usuario seleccionado
 */
function idUsuarioSeleccionado() {

  const usuarioSeleccionado = document.getElementById("usuarios").value;
  return usuarioSeleccionado;

}



/**
 * Busca el indice donde esta el usuario seleccionado en el arreglo de usuarios
 * @returns {Number} El indicie del usuario
 */
function indiceUsuarioSeleccionado() {

  const indice = usuariosRecuperados.findIndex(u => u.id == idUsuarioSeleccionado());
  return indice;

}



/**
 * Busca y devuelve el usuario que esta seleccionado en el select de usuarios
 * @returns {Object} El usuario
 */
function trearUsuarioSeleccionado() {

  const indiceUsuario = indiceUsuarioSeleccionado();

  return usuariosRecuperados[indiceUsuario];

}



/**
 * Agrega un permiso a un determinado usuario
 * @param {Number} indiceUsuario Es el indice del arreglo donde estan los usuarios
 * @param {String} permiso Es el permiso que se le quiere agregar al usuario
 */
function agregarPermisoAlUsuarioSeleccionado(indiceUsuario, permiso) {

  usuariosRecuperados[indiceUsuario].permisos.push(permiso);

}



/**
 * Remueve un permiso a un determinado usuario
 * @param {Number} indiceUsuario Es el indice del arreglo donde estan los usuarios
 * @param {String} permiso Es el permiso que se le quiere quitar al usuario
 */
function quitarPermisoAlUsuarioSeleccionado(indiceUsuario, permiso) {

  const permisosDelUsuario = usuariosRecuperados[indiceUsuario].permisos;
  const indicePermiso = permisosDelUsuario.findIndex(u => u.includes(permiso));
  permisosDelUsuario.splice(indicePermiso, 1);

}


/**
 * Funcion manejadora del evento click de la opcion del tipo de dato enum
 * @param {Event} event El evento desatado
 */
function abrirModalEnums(event) {
  const select = event.target;

  if (!nombreCampoTipoEnumVacio(select)) {
    const nombreCampo = select.parentNode.previousSibling.lastChild.previousSibling.value;
  
    llenarListaEnums(nombreCampo);

    const titulo = `Enums para el campo ${nombreCampo}`;

    const modalEnums = obtenerElementoPorId('modal-enums');
    modalEnums.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.firstChild.nextSibling.innerHTML = titulo;
    const modal = new bootstrap.Modal(modalEnums, {});
    modal.show();
  }
}



/**
 * Agrega un enum a la lista de enums aociados a un campo de atributo
 */
function addEnumALaLista() {
  const inputEnum = obtenerElementoPorId("input-enum");

  const nuevoEnum = inputEnum.value?.toUpperCase();
  const nombreCampo = inputEnum.parentElement.previousSibling.previousSibling.firstChild.nextSibling.innerHTML.split(" ").pop();
  
  if (mapaEnums.has(nombreCampo)) {
    mapaEnums.get(nombreCampo).push(nuevoEnum);
  }
  else {
    mapaEnums.set(nombreCampo, [nuevoEnum]);
  }

  const ul = obtenerElementoPorId("lista-enums");
  const li = elementos.crearLI(nuevoEnum, "list-group-item");
  li.addEventListener("click", borrarEnumDeLaLista);
  ul.appendChild(li);
  
  inputEnum.value = "";
}



/**
 * Borra un enum de la lista de enums aociados a un campo de atributo
 * @param {Event} event El evento desatado
 */
function borrarEnumDeLaLista(event) {
  const NombreCampoEnum = obtenerElementoPorId("modal-enums-title").innerHTML.split(" ")[4];
  let disparadorDelEvento = event.target;

  if (disparadorDelEvento.tagName === "I") {
    disparadorDelEvento = disparadorDelEvento.parentNode;
  }

  const EnumABorrar = disparadorDelEvento.previousSibling.innerHTML;

  const indiceEnum = mapaEnums.get(NombreCampoEnum).findIndex(e => e === EnumABorrar);

  mapaEnums.get(NombreCampoEnum).splice(indiceEnum, 1);

  llenarListaEnums(NombreCampoEnum);

}



/**
 * Llena la lista de enums del modal enums
 * @param {String} nombreCampo El nombre del atributo que tiene como tipo de dato enum
 */
function llenarListaEnums(nombreCampo) {
  const ul = obtenerElementoPorId("lista-enums");
  ul.innerHTML = "";
  if (mapaEnums.has(nombreCampo)) {
    mapaEnums.get(nombreCampo).forEach(e => {
      const li = elementos.crearLI(e, "list-group-item");
      li.addEventListener("click", borrarEnumDeLaLista);
      ul.appendChild(li);
    });
  }
}