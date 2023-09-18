const router = require("express").Router();
const generarCRUDController = require("../controladores/generarCRUDControlador");



router.get("/", generarCRUDController.vistaGenerarCRUD);

router.post("/nuevoRecurso", generarCRUDController.crear);


module.exports = router;