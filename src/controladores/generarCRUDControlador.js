const pug = require("pug");
const { rechazarSiFaltanDatos, validarNombre, ValidarNombresAtributos } = require("../server_scripts/validacionesNuevoRecurso");
const { generarArchivoModelo,
  generarArchivoRouter,
  generarArchivoController,
  capitalizar } = require("../server_scripts/generarArchivos.js");

const { Usuario, Recursos, Acceso } = require("../modelos/relaciones");

exports.vistaGenerarCRUD = async function(req, res) {
	res.send(pug.renderFile("src/vistas/generarCRUD.pug", {
    pretty: true,
    tabTitle: `Generar CRUD`
  }));
}

exports.crear = async function (req, res) {
	const atributos = req.body.atributos;
  const nombre = req.body.nombreRecurso;
  const usuariosConPermisos = req.body.usuariosConPermisos;

  try {
    rechazarSiFaltanDatos(atributos, nombre, usuariosConPermisos);
    validarNombre(nombre);
    ValidarNombresAtributos(atributos);

    await generarArchivoModelo(atributos, nombre);
    await generarArchivoRouter(nombre);
    await generarArchivoController(nombre);

    await sincronizarModeloALaBD(nombre);

    const recurso = await Recursos.create({nombreRecurso: nombre});
    const datos = [];
    usuariosConPermisos.forEach(u => {
      datos.push({
        id_usuario: u.id,
        id_recurso: recurso.id_recurso,
        consultar: u.permisos.includes("consultar") || u.permisos.includes("modificar") || u.permisos.includes("eliminar"),
        crear: u.permisos.includes("crear"),
        modificar: u.permisos.includes("modificar"),
        eliminar: u.permisos.includes("eliminar")
      });
    });
    await Acceso.bulkCreate(datos);

    res.status(201).json({
      ok: true,
      mensaje: "Recurso Creado"
    });
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      mensaje: error.message
    });
  }

}



/**
 * Sincroniza el nuevo modelo creando su tabla en la BD
 * @param {String} nombreRecurso El nombre del recurso
 * @throws {Error} Arroja un error con un mensaje si ocurre algun error al generar la tabla en la BD
 */
async function sincronizarModeloALaBD(nombreRecurso) {
  try {

    const modelo = require(`../modelos/modelos_dinamicos/${capitalizar(nombreRecurso)}.model.js`);
    await modelo.sync();
    
  }
  catch (error) {console.log(error);
    throw new Error("Error al sincronizar el nuevo recurso a la BD");
  }
  
}