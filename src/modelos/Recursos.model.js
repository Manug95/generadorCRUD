const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const { validarLongitud } = require("../server_scripts/validacionesDeModelos.js");
const Usuario = require("./Usuario.model.js");
const Acceso = require("./Acceso.model.js");

class Recursos extends Model { }

Recursos.init({
  id_recurso: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombreRecurso: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      longitud(value) {
        validarLongitud("nombreRecurso",value);
      }
    }
  }
}, {
  sequelize,
  modelName: "Recursos",
  tableName: "recursos",
  timestamps: false
});

// Recursos.belongsToMany(Usuario, {through: Acceso});
// Recursos.hasMany(Acceso);


module.exports = Recursos;