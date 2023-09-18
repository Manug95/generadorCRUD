const express = require("express");
const session = require("express-session");
const path = require('path');

const app = express();

const routerUsuarios = require("../rutas/usuario.router");
const routerGenerarCRUD = require("../rutas/generarCRUD.router");
const routerRecursos = require("../rutas/recursos.router");

app.use(session({
  secret: "app_generar_crud",
  resave: true,
  saveUninitialized: true,
  name: "cookieSession",
  cookie: {
    maxAge: 60 * 60 * 1000 //1 hora
  }
}));


app.use((req, res, next) => {
  const url = req.url;

  //si la url de una solicitud GET termina con '/', se la quito y redirijo a la misma ruta pero sin la '/'
  url.substring(url.length-1) === "/" && req.method === "GET" ? res.redirect(url.substring(0, url.length-1)) : next();
  
});


app.use(express.static("public"));
app.use(express.json());

// const { Usuario, Recursos, Acceso } = require("../modelos/relaciones");
// app.get("/tablas", async (req, res) => {

//   await Usuario.sync( /*{force:true}*/ );
//   await Recursos.sync( /*{force:true}*/ );
//   await Acceso.sync( /*{force:true}*/ );

// 	res.redirect("/generarCRUD");
// });

app.use("/usuarios", routerUsuarios);
app.use("/generarCRUD", routerGenerarCRUD);
app.use("/recursos", routerRecursos);


app.get("/", (req, res) => {
  res.redirect("/generarCRUD");
});


app.get("*", (req, res) => {
  if (req.url.includes("favicon.ico")) {
    res.end();
  }

  res.status(404).sendFile("error-404.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
  });
});



module.exports = app;