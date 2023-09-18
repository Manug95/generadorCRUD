const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/sequelize.js");
const { validarLongitud } = require("../server_scripts/validacionesDeModelos.js");


class Usuario extends Model {}

Usuario.init({
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: {
        args: true,
        msg: 'Por favor, ingrese una dirección de correo electrónico válida'
      },
      longitud(value) {
        validarLongitud("email",value);
      }
    }
  },
  contrasenia: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: "Se requiere una contraseña"
      }
    }
  },
  nombreUsuario: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      longitud(value) {
        validarLongitud("nombreUsuario",value);
      }
    }
  }
}, {
  sequelize,
  modelName: "Usuario",
  tableName: "Usuario",
  timestamps: false
});

module.exports = Usuario;