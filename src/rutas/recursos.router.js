const express = require("express");
const router = express.Router();
const path = require('path');

// var enrutadorRecursos = express.Router();
// var ruta = "";


/**
 * Middleware que controla si el usuario esta autenticado
 */
router.use((req, res, next) => {
  if (!req.session.sesion) {
    res.redirect("../../usuarios/login");
  }
  else {
    next();
  }
});

router.use((req, res, next) => {
  try {
    const nombreRecurso = req.url.split("/")[1];
    const ruta = `/${nombreRecurso}`;
    const enrutadorRecursos = require(`./rutas_dinamicas/${nombreRecurso}.router.js`);

    if (enrutadorRecursos) {
      router.use(ruta, enrutadorRecursos);
    }
    else {
      throw new Error();
    }

    next();
  }
  catch (error) {
    res.status(404).sendFile("error-404.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
      res.status = 500;
      res.end();
    });
  }
});


module.exports = router;