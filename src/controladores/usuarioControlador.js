const { Usuario } = require("../modelos/relaciones.js");
const { datosUsuarioIncompletos, datosIncompletosLogin } = require("../server_scripts/validacionesDeModelos.js");
const pug = require("pug");
const bcrypt = require("bcryptjs");

// const sessions = [];

exports.listar = async function(req, res){
  try {
    const usuarios = await Usuario.findAll();

    res.status(200).json({
      ok: true,
      status: 200,
      mensaje:"Usuarios recuperados con exito",
      body: usuarios.map(u => {
        return {
          id: u.id_usuario, 
          userName: `${u.nombreUsuario} - ${u.id_usuario}`,
          permisos: []
        }
      })
    });
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje:"Los usuarios no se pudieron recuperar",
      body: null
    });
  }
}

exports.crear = async function(req, res){
  // console.log(req.body);

  try {
    const body = req.body;
    
    datosUsuarioIncompletos(body);

    const salt = await bcrypt.genSalt(10);
    body.contrasenia = await bcrypt.hash(body.contrasenia, salt);

    const nuevoUsuario = await Usuario.create(body);

    res.status(201).json({
      ok: true,
      status: 201,
      mensaje: "Usuario creado con exito"
    });
  }
  catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje: error.name === "SequelizeUniqueConstraintError" ? "Este Email ya existe" : error.message.replace("Validation e", "E")
    });
  }
}

exports.autenticar = async function(req, res) {
  try {
    const body = req.body;

    datosIncompletosLogin(body);

    const usuario = await Usuario.findOne({where: {email: body.email}});

    if (!usuario) {
      throw new Error("Credenciales incorrectas");
    }

    const contraseniaValida = await bcrypt.compare(body.contrasenia, usuario.contrasenia);

    if (!contraseniaValida) {
      throw new Error("Credenciales incorrectas");
    }

    //generacion de la sesion
    const sesion = {
      id: usuario.id_usuario,
      email: usuario.email
    };

    req.session.sesion = sesion;

    res.json({
      ok: true,
      status: 200,
      mensaje: `Bienvenid@ ${usuario.nombreUsuario}!`
    });

  } catch (error) {
    res.status(400).json({
      ok: false,
      status: 400,
      mensaje: error.message
    });
  }
}

exports.desautenticar = async function(req, res) {
  if (req.session.sesion) {
    req.session.destroy((err) => {
      res.redirect("../../generarCRUD");
    });
  }
}

exports.vistaRegistro = function(req, res){
  res.send(pug.renderFile("src/vistas/register.pug", {
    pretty: true,
    tabTitle: "Registrar usuario"
  }));
}

exports.vistaLogin = function(req, res) {
  res.send(pug.renderFile("src/vistas/login.pug", {
    pretty: true,
    tabTitle: "Login"
  }));
}