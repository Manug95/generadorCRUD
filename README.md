# generadorCRUD
Práctico de Laboratorio II ULP

## Enunciado
Genere una aplicación que permita generar dinámicamente una solución CRUD para
un recurso.  
Para llevarlo a cabo el usuario accedera a la página “/generarCRUD” donde podrá
especificar el nombre del recurso y cada uno de sus atributos. Cada atributo deberá
registrarse con su tipo de dato (no hay límite en la cantidad de atributos que puede
tener el recurso).  
Los tipos de datos disponibles serán (entero, varchar (50), bool, enum)
Además se deberá poder establecer los permisos que tendrán los usuarios
existentes sobre el recurso. Los permisos que podrán configurarse son consulta,
borrado, actualización e inserción.  
Una vez registrada la información el programa deberá generar la tabla
correspondiente a ese recurso.

El programa generará dinámicamente una “librería” con la siguiente
funcionabilidad:
Una clase modelo del recurso.  
Una clase controladora que implemente los diferentes endpoints del recurso.  
Una clase router para enrutar cada uno de los endpoints del recurso:  
GET /recurso/{id} Retorna datos de un recurso  
GET /recurso/create Muestra formulario para nuevo recurso  
POST /recurso/ registra nuevo recurso  
GET /recurso/ Retorna listado de los recursos  
GET /recurso/{id}/edit Muestra formulario para editar recurso  
PUT /recurso/{id} Actualiza los datos del recurso  
DELETE /recurso/{id} Elimina un recurso  

Tener en cuenta que los formularios tengan elementos adecuados al tipo de datos
de los atributos del recurso.

Una vez generada la solución el usuario puede loguearse en la aplicación y acceder
a los endpoints del recurso. Solo podrá realizar las operaciones a las cuales tiene
permiso.

Notas:  
    * Se deberá implementar la funcionabilidad para registrar y autenticar usuarios.  
    * No se podrán acceder a los endpoints del recurso sin haberse autenticado.  
