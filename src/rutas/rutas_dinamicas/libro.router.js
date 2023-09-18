const router = require("express").Router();
const libroController = require("../../controladores/controladores_dinamicos/libro.controlador.js");
const autorizacion = require("../../middlewares/autorizaciones.js");


//POST /recurso/ registra nuevo recurso
router.post("/", autorizacion.crear, libroController.crear);


//GET /recurso/ Retorna listado de los recursos
router.get("/", autorizacion.consultar, libroController.listar);


//GET /recurso/create Muestra formulario para nuevo recurso
router.get("/create", autorizacion.crear, libroController.vistaCrear);


//GET /recurso/{id} Retorna datos de un recurso
router.get("/:id", autorizacion.consultar, libroController.traer);


//PUT /recurso/{id} Actualiza los datos del recurso
router.put("/:id", autorizacion.modificar, libroController.editar);


//DELETE /recurso/{id} Elimina un recurso
router.delete("/:id", autorizacion.eliminar, libroController.eliminar);


//GET /recurso/{id}/edit Muestra formulario para editar recurso
router.get("/:id/edit", autorizacion.modificar, libroController.vistaEditar);



module.exports = router;