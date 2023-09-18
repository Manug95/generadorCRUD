const router = require("express").Router();
const personaController = require("../../controladores/controladores_dinamicos/persona.controlador.js");
const autorizacion = require("../../middlewares/autorizaciones.js");



//POST /recurso/ registra nuevo recurso
router.post("/", autorizacion.crear, personaController.crear);


//GET /recurso/ Retorna listado de los recursos
router.get("/", autorizacion.consultar, personaController.listar);


//GET /recurso/create Muestra formulario para nuevo recurso
router.get("/create", autorizacion.crear, personaController.vistaCrear);


//GET /recurso/{id} Retorna datos de un recurso
router.get("/:id", autorizacion.consultar, personaController.traer);


//PUT /recurso/{id} Actualiza los datos del recurso
router.put("/:id", autorizacion.modificar, personaController.editar);


//DELETE /recurso/{id} Elimina un recurso
router.delete("/:id", autorizacion.eliminar, personaController.eliminar);


//GET /recurso/{id}/edit Muestra formulario para editar recurso
router.get("/:id/edit", autorizacion.modificar, personaController.vistaEditar);


router.use((error, req, res, next) => {console.log("hola");
  res.status(500).sendFile("error-404.html", { root: path.join(__dirname, '..', 'vistas', 'errores') }, (error) => {
    res.status = 500;
    res.end();
  });
});



module.exports = router;