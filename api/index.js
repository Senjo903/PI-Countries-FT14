const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const { searchData, upData, checkData } = require('./src/controllers/upData');
const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";

conn.sync({ force: true }).then(async() => {
  //antes de arrancar servidor revisamos si hay datos de paises
  searchData().then((result) => {
    if (result === true) {
      //si da verdadero proseguimos a arrancar el servidor porque ya tenemos datos cargados
      console.log('The DB already contains data');//la base de datos ya contiene datos
      server.listen(3001, () => {
        console.log('server ' + green + 'listening' + reset + ' at 3001'); // eslint-disable-line no-console
      })
    } else {
      //como no tenemos datos antes de arrancar el servidor primero traemos las ciudades y los subiremos a la db
      upData().then((result) => {
        //revisamos si todos los datos subieron exitosamente y ordenamos la informacion de los errores y los paises subidos correctamente
        checkData(result);
        //ya podemos arrancar el servidor
        server.listen(3001, () => {
          console.log('server ' + green + 'listening' + reset + ' at 3001'); // eslint-disable-line no-console
        })
      })
    }
  })
}).catch((e) => {
  //el servidor nunca escucha porque hubo error al conectar en la db
  console.log(red + 'Error connecting to DB' + reset);//error al conectarse a la base de datos
  console.log('Error: '+ e)
})