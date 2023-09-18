const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize.js");
// const Persona = require("./Persona.model.js");
// const Usuario = require("./Usuario.model.js");
// const Recursos = require("./Recursos.model.js");
// const { Usuario, Recursos } = require("./relaciones.js");
// const Permisos = require("./Permisos.model.js");



class Acceso extends Model {}

Acceso.init({
  consultar: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  crear: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  modificar: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  eliminar: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
}, {
  sequelize,
  modelName: "Acceso",
  tableName: "Acceso",
  timestamps: false
});

// Acceso.belongsTo(Usuario);
// Acceso.belongsTo(Recursos);


module.exports = Acceso