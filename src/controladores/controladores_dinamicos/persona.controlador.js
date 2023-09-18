const pug = require("pug");
const Persona = require(`../../modelos/modelos_dinamicos/Persona.model.js`);
const path = require("path");
const { tipoDatoParaLosFormInputs, validarParametroID } = require("../../server_scripts/validacionesDeModelos.js");


exports.crear = async function(req, res) {
  try {
    const datos = req.body;console.log(datos);

    const nuevoRecurso = await Persona.create(datos);

    res.status(201).json({
      ok: true,
      status: 201,
      mensaje:"Registro de Persona creado con exito"
    });
  }
  catch (error) {//console.log(error);
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje: error.message
    });
  }
}

exports.listar = async function(req, res) {
  try {
    const recursos = await Persona.findAll();

    const campos = Object.entries(Persona.getAttributes()).map(atrib => atrib[0]);

    const valoresDeLasInstancias = recursos.map(u => {
      return campos.map(c => u[c]);
    });

    const resultado = pug.renderFile("src/vistas/vistaListar.pug", {
      campos: campos,
      instancias: valoresDeLasInstancias,
      tabTitle: "Listar Persona",
      pretty: true,
      recurso: "persona",
      tituloH1: "Lista del recurso persona",
      eliminar: req.eliminar,
      error: "NO HAY RESULTADOS"
    });

    res.send(resultado);
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje:"Los registros no se pudieron recuperar",
      body: null
    });
  }
}

exports.traer = async function(req, res) {
  try {
    const id = req.params.id;

    validarParametroID(id);

    const recurso = await Persona.findByPk(id);

    const campos = Object.entries(Persona.getAttributes()).map(u => u[0]);

    const valores = [];
    if (recurso) {
      valores.push(...campos.map(c => recurso[c]));
    }

    const resultado = pug.renderFile("src/vistas/vistaMostrarUno.pug", {
      campos: campos,
      instancias: valores,
      tabTitle: "Persona",
      pretty: true,
      tituloH1: "Resultado de la busqueda de persona",
      eliminar: req.eliminar,
      recurso: "persona",
      error: "NO HAY RESULTADOS PARA EL RECURSO 'Persona' CON ID " + id
    });

  res.send(resultado);

  } catch (error) {
    if (error.message.includes("ID")) {
      res.status(400).sendFile("error-404.html", { root: path.join(__dirname, '..', '..', 'vistas', 'errores') }, (error) => {
        res.status = 500;
        res.end();
      });
    }
    else {
      res.status(400).json({
        ok: false,
        status: 400,
        mensaje:"Registro no encontrado",
        body: null
      });
    }
  }
}

exports.editar = async function(req, res) {
  try {
    const id = req.params.id;

    validarParametroID(id);

    const recurso = req.body;

    const recursoEditado = await Persona.update(recurso, {where: { id: id}});

    res.status(200).json({
      ok: true,
      status: 200,
      mensaje:"Registro editado con exito"
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje: error.message //"El registro no se pudo editar"
    });
  }
}

exports.eliminar = async function(req, res) {
  try {
    const id = req.params.id;

    validarParametroID(id);

    const recursoBorrado = await Persona.destroy({where: {id: id}});

    res.status(200).json({
      ok: true,
      status: 204,
      mensaje:"Registro eliminado con exito"
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje:"El registro no se pudo eliminar"
    });
  }
}

exports.vistaCrear = function(req ,res) {
  // res.status(200).sendFile("crearPersona.html", { root: path.join(__dirname, '..', '..', 'vistas', 'vistasCRUD') }, (error) => {
  //   res.status = 500;
  //   res.end();
  // });

  const datos = Object.entries(Persona.getAttributes())
  .filter(a => a[0] !== "id")
  .map(a => {
    const tipo = tipoDatoParaLosFormInputs(a[1].type);
    return {
      campo: a[0],
      tipoDato:  tipo === "enum" ? a[1].type.values : tipo
    }
  });

  res.send(pug.renderFile("src/vistas/vistaCrear.pug", {
    pretty: true,
    campos: datos,
    tabTitle: `Crear Persona`,
    nombre: "persona"
  }));
}

exports.vistaEditar = async function(req, res) {
  try {
    const id = req.params.id;

    validarParametroID(id);

    const recurso = await Persona.findByPk(id);

    if (!recurso) {
      throw new Error("El registro no existe");
    }

    const datos = Object.entries(recurso.rawAttributes)
    .map(a => {
      const tipo = tipoDatoParaLosFormInputs(a[1].type);
      return {
        campo: a[0],
        tipoDato:  tipo === "enum" ? a[1].type.values : tipo,
        valor: recurso[a[0]]
      }
    });

    res.send(pug.renderFile("src/vistas/vistaModificar.pug", {
      pretty: true,
      campos: datos,
      tabTitle: "Modoficar persona",
      nombre: "persona"
    }));

  } catch (error) {
    if (error.message.includes("ID")) {
      res.status(400).sendFile("error-404.html", { root: path.join(__dirname, '..', '..', 'vistas', 'errores') }, (error) => {
        res.status = 500;
        res.end();
      });
    }
    else {
      res.status(400).json({
        ok: false,
        status: 400,
        mensaje: error.message
      });
    }
  }
}