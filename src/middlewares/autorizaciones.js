const Acceso = require("../modelos/relaciones.js").Acceso;
const Recursos = require("../modelos/relaciones.js").Recursos;
const { Op } = require("sequelize");
const path = require("path");


exports.consultar = async (req, res, next) => {
  const permisos = await buscarPermisos(req);

  if (!permisos) res.send("No tiene permiso");

  if (permisos.consultar) {
    req.eliminar = permisos.eliminar;
    next();
  }
  else {
    res.status(403).sendFile("error-403.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
    });
  }
  
}


exports.crear = async (req, res, next) => {
  const permisos = await buscarPermisos(req);

  if (!permisos) res.send("No tiene permiso");

  if (permisos.crear) {
    next();
  }
  else {
    res.status(403).sendFile("error-403.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
    });
  }
}


exports.modificar = async (req, res, next) => {
  const permisos = await buscarPermisos(req);

  if (!permisos) res.send("No tiene permiso");

  if (permisos.modificar) {
    next();
  }
  else {
    res.status(403).sendFile("error-403.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
    });
  }
}


exports.eliminar = async (req, res, next) => {
  const permisos = await buscarPermisos(req);

  if (!permisos) res.send("No tiene permiso");

  if (permisos.eliminar) {
    next();
  }
  else {
    res.status(403).sendFile("error-403.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
    });
  }
}


async function buscarPermisos(req) {
  const idUsuario = req.session.sesion.id;
  const nombreRecurso = req.baseUrl.split("/")[2];
  // const nombreRecurso = req.url.substring(1);console.log(nombreRecurso);

  const recurso = await Recursos.findOne({where: {nombreRecurso: nombreRecurso}});
  const acceso = await Acceso.findOne({
    where: {
      [Op.and]: [
        { id_usuario: idUsuario }, 
        { id_recurso:  recurso.id_recurso}
      ]
    }
  });

  return acceso;
}