const fs = require("fs/promises");



/**
 * Crea el archivo de las rutas controladoras del nuevo recurso
 * @param {String} nombreRecurso El nombre del nuevo recurso
 * @throws {Error} Arroja un error con un mensaje si ocurre algun error al generar el archivo
 */
async function generarArchivoRouter(nombreRecurso) {
  try {
    const plantilla = await fs.readFile("./src/crud_templates/router.template.txt", { encoding: "utf-8" });

    // const recurso = capitalizar(nombreRecurso);

    const resultado = plantilla.replace(/_recurso_/g, nombreRecurso.toLowerCase());

    await fs.writeFile(`./src/rutas/rutas_dinamicas/${nombreRecurso.toLowerCase()}.router.js`, resultado);
  }
  catch (error) {
    throw new Error("Error al generar el archivo de rutas");
  }

}


/**
 * Crea el archivo del controlador del nuevo recurso
 * @param {String} nombreRecurso El nombre del nuevo recurso
 * @throws {Error} Arroja un error con un mensaje si ocurre algun error al generar el archivo
 */
async function generarArchivoController(nombreRecurso) {
  try {
    const plantilla = await fs.readFile("./src/crud_templates/controller.template.txt", { encoding: "utf-8" });

    // const recurso = capitalizar(nombreRecurso);

    const resultado = plantilla.replace(/_Recurso_/g, capitalizar(nombreRecurso)).replace(/_recurso_/g, nombreRecurso.toLowerCase());

    await fs.writeFile(`./src/controladores/controladores_dinamicos/${nombreRecurso.toLowerCase()}.controlador.js`, resultado);
  }
  catch (error) {
    throw new Error("Error al generar el archivo controlador");
  }

}



/**
 * Crea el archivo de la clase modelo del nuevo recurso
 * @param {any[]} datos Array con los nombre y tipos de datos de los atributos
 * @param {String} nombreRecurso El nombre del recurso
 * @throws {Error} Arroja un error con un mensaje si ocurre algun error al generar el archivo
 */
async function generarArchivoModelo(datos, nombreRecurso) {
  try {
    const plantilla = await fs.readFile("./src/crud_templates/model.template.txt", { encoding: "utf-8" });

    const atributos = generarAtributos(datos);
    const recurso = capitalizar(nombreRecurso);

    const resultado = plantilla
    .replace("*atributos*", atributos)
    .replace(/_NAME_/g, recurso);

    await fs.writeFile(`./src/modelos/modelos_dinamicos/${recurso}.model.js`, resultado);//console.log("asd");
    // await fs.writeFile(`./src/modelos/modelos_dinamicos/prueba.js`, resultado);//console.log("asd");
  }
  catch (error) {console.log(error);
    throw new Error("Error al generar el archivo model");
  }
}



/**
 * Crea un string con los atributos y sus tipo de datos para la clase modelo
 * @param {Object[]} atributos Array con los nombre y tipos de datos de los atributos
 * @returns {String} Devuelve un string con los atributos de la clase modelo
 */
function generarAtributos(atributos) {

  const resutlado = atributos.map(atrib => {
    const atributo = atrib[0];
    const tipoDato = formatearTipoDeDatoParaModelo(atrib[1]);

    return `${atributo}: {
    type: DataTypes.${tipoDato.toUpperCase()},
    allowNull: false,
    ${setearValidadores(tipoDato, atributo)}
  }`;
  })
  .join(",\n\t");

  return resutlado;
  
}



/**
 * Formatea el tipo de dato elegido en el front para ajustarlo al de la bd
 * @param {String} tipo El string con el tipo de dato a formatear
 * @returns {String} El string del tipo de dato formateado para generar el archivo
 */
function formatearTipoDeDatoParaModelo(tipo) {
  let tipoDato;

  if (Array.isArray(tipo)) {
    tipoDato = `enum(${tipo.map(e => `"${e}"`)})`;
  }
  else if (tipo === "string") {
    tipoDato = tipo+"(50)"
  }
  else if (tipo === "number") {
    tipoDato = "integer";
  }
  else {
    tipoDato = tipo;
  }

  return tipoDato;
  
}



/**
 * Setea los validadores segun el tipo de dato del campo
 * @param {String} tipoDato El tipo de dato del campo
 * @param {String} atributo Nombre del campo
 */
function setearValidadores(tipoDato, atributo) {
  if (tipoDato === "string(50)") {
    return `validate: {
      ${validadorLongitud(atributo)}
      ${atributoNotNull(atributo)}
    }`;
  }
  else if (tipoDato === "integer") {
    return `validate: {
      ${validadorIsInt(atributo)}
      ${atributoNotNull(atributo)}
    }`;
  }
  else if (tipoDato.includes("enum")) {
    return `validate: {
      ${validadorIsIn(tipoDato, atributo)}
      ${atributoNotNull(atributo)}
    }`;
  }
  else {
    return "";
  }
}



/**
 * Crea el string del validador del tipo de dato enum
 * @param {String} tipoDatoEnum El tipo de dato enum con sus valores
 * @param {String} atributo El nombre del atributo
 * @returns {String} Un string del validador
 */
function validadorIsIn(tipoDatoEnum, atributo) {
  return `isIn: {
        args: [[${tipoDatoEnum.substring(0,tipoDatoEnum.length-1).toUpperCase().split("(")[1]}]],
        msg: 'Valor incorrecto en el campo ${atributo}'
      },`;
}



/**
 * Crea el string del validador del tipo de dato integer
 * @param {String} atributo El nombre del atributo
 * @returns {String} Un string del validador
 */
function validadorIsInt(atributo) {
  return `isInt: {
        args: true,
        msg: 'Valor incorrecto en el campo ${atributo}'
      },`;
}



/**
 * Crea el string del validador del tipo de dato varchar
 * @param {String} atributo El nombre del atributo
 * @returns {String} Un string del validador
 */
function validadorLongitud(atributo) {
  return `longitud(value) {
        validarLongitud("${atributo}",value);
      },`;
}




/**
 * Crea el string del validador para impedir valores nulos
 * @param {String} atributo El nombre del atributo
 * @returns {String} Un string del validador
 */
function atributoNotNull(atributo) {
  return `notNull: {
        args: true,
        msg: 'El campo ${atributo} NO puede ser nulo'
      }`;
}



/**
 * Convierte una palabra en formato Capital
 * @param {String} cadena La palabra a formatear
 * @returns Devuelve una palabra en formato Capital
 */
function capitalizar(cadena) {
	return cadena.charAt(0).toUpperCase() + cadena.substr(1).toLowerCase();
}



module.exports = {
	generarArchivoModelo,
  generarArchivoRouter,
  generarArchivoController,
  capitalizar
}