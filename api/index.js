const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { searchData, upData, checkData } = require('./src/controllers/upData');

conn.sync({ force: true }).then(async() => {
  //antes de arrancar servidor revisamos si hay datos de paises
  searchData().then((result) => {
    if (result === true) {
      //si da verdadero proseguimos a arrancar el servidor porque ya tenemos datos cargados
      console.log('la DB ya contiene datos :)')
      server.listen(3001, () => {
        console.log('%s listening at 3001'); // eslint-disable-line no-console
      })
    } else {
      //como no tenemos datos antes de arrancar el servidor primero traemos las ciudades y los subiremos a la db
      upData().then((result) => {
        //revisamos si todos los datos subieron exitosamente y ordenamos la informacion de los errores y los paises subidos correctamente
        checkData(result);
        //ya podemos arrancar el servidor
        server.listen(3001, () => {
          console.log('%s listening at 3001'); // eslint-disable-line no-console
        })
      })
    }
  })
}).catch((error) => {
  //el servidor nunca escucha porque hubo error al conectar en la db
  console.log(error+'')//si adjuntamos un espacio al error solo muestra el detalle del error sin tanto texto
})