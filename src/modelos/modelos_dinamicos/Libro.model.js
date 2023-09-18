const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/sequelize.js");
const { validarLongitud } = require("../../server_scripts/validacionesDeModelos.js");

class Libro extends Model {}

Libro.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  titulo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      longitud(value) {
        validarLongitud("titulo",value);
      },
      notNull: {
        args: true,
        msg: 'El campo titulo NO puede ser nulo'
      }
    }
  },
	nroPaginas: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: 'Valor incorrecto en el campo nroPaginas'
      },
      notNull: {
        args: true,
        msg: 'El campo nroPaginas NO puede ser nulo'
      }
    }
  },
	tipo: {
    type: DataTypes.ENUM("FANTASIA","NOVELA","HISTORIA"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["FANTASIA","NOVELA","HISTORIA"]],
        msg: 'Valor incorrecto en el campo tipo'
      },
      notNull: {
        args: true,
        msg: 'El campo tipo NO puede ser nulo'
      }
    }
  }
}, {
  sequelize,
  modelName: "Libro",
  tableName: "Libro",
  timestamps: false
});

module.exports = Libro;