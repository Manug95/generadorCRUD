const Recursos = require("./Recursos.model.js");
const Acceso = require("./Acceso.model.js");
const Usuario = require("./Usuario.model.js");

Usuario.belongsToMany(Recursos, {through: Acceso, foreignKey: "id_usuario"});
Recursos.belongsToMany(Usuario, {through: Acceso, foreignKey: "id_recurso"});
// Usuario.belongsToMany(Recursos, {through: Acceso});
// Recursos.belongsToMany(Usuario, {through: Acceso});

// Recursos.hasMany(Acceso);
// Usuario.hasMany(Acceso);
// Acceso.belongsTo(Usuario);
// Acceso.belongsTo(Recursos);


module.exports = {
  Usuario,
  Recursos,
  Acceso
}