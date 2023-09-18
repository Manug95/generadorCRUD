const { DataTypes, Model } = require("sequelize");
const sequelize = require("../../config/sequelize.js");
const { validarLongitud } = require("../../server_scripts/validacionesDeModelos.js");

class Persona extends Model {}

Persona.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(50),
    allowNull: false,
    validate: {
      longitud(value) {
        validarLongitud("nombre",value);
      },
      notNull: {
        args: true,
        msg: 'El campo nombre NO puede ser nulo'
      }
    }
  },
	edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: {
        args: true,
        msg: 'Valor incorrecto en el campo edad'
      },
      notNull: {
        args: true,
        msg: 'El campo edad NO puede ser nulo'
      }
    }
  },
	estCivil: {
    type: DataTypes.ENUM("CASADO","SOLTERO","VIUDO"),
    allowNull: false,
    validate: {
      isIn: {
        args: [["CASADO","SOLTERO","VIUDO"]],
        msg: 'Valor incorrecto en el campo estCivil'
      },
      notNull: {
        args: true,
        msg: 'El campo estCivil NO puede ser nulo'
      }
    }
  },
	trabaja: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    
  }
}, {
  sequelize,
  modelName: "Persona",
  tableName: "Persona",
  timestamps: false
});

module.exports = Persona;