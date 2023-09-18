const router = require("express").Router();
const usuarioController = require("../controladores/usuarioControlador");



router.get("/login", usuarioController.vistaLogin);

router.get("/salir", usuarioController.desautenticar);

router.get("/register", usuarioController.vistaRegistro);

router.post("/nuevo", usuarioController.crear);

router.post("/autenticar", usuarioController.autenticar);

router.get("/listar", usuarioController.listar);


module.exports = router;