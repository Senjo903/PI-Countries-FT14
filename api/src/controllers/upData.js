const { Country, Continent } = require('../db.js');
const axios = require('axios');
const green = "\x1b[32m";
const red = "\x1b[31m";
const reset = "\x1b[0m";
//cargando db por primera ves si ya hay datos no ara nada solo avisar
async function searchData() {
    //revisamos si la tabla de paises tiene datos
    const data = await Country.findOne().catch((e) => {
      console.log('');
      console.log('Could not check if there is data loaded in the DB');//no se pudo verificar si hay datos cargados en la base de datos
      console.log('Error: '+ e);
      console.log('');
      return null;
    });
    if (data === null) {
        return false;
    } else {
        return true;
    }
}

async function upData() {
  console.log('Looking for data in API...');//buscando datos en la API
  //con axios obtenemos los datos de paises
  const ResultAxios = await axios.get('https://restcountries.eu/rest/v2/all').then((r) => {
    console.log('');
    console.log(green + 'Successful search !!' + reset);//búsqueda exitosa
    console.log('');
    return [true, r]
  }).catch((e) => {
    console.log('');
    console.log('API search failure: '+ red + e + reset);//error de búsqueda de API
    console.log('');
    return [false]
  });
  //si salio exitosa la busqueda seguiremos
  if (ResultAxios[0] === true) {
    //crearemos una array para guardar los nombres de continentes de los paises
    const arraycontinents = [];
    //en una array pondremos todos los paises obtenidos de la api como objetos ya listos para integrar a nuestra DB
    const arrayCountrys = Object.values(ResultAxios[1])[5].map((country) => {
      //solo guardaremos los datos necesarios para la ruta principal
      let result = {
        ID: country.alpha3Code,
        name: country.name,
        imgURL: country.flag,
        continent: country.region,
        capital: country.capital,
        subregion: country.subregion,
        area: Math.trunc(country.area),
        population: country.population
      }
      //si el continente no esta en nuestra array de continentes lo agregamos hago este paso para evitar hacer 250 findOrCreate en la DB y ahorrar consultas
      if(arraycontinents.includes(country.region) === false){
        arraycontinents.push(country.region);
      }
      return result
    });
    //antes de iniciar a crear cada country crearemos nuestra tabla con continentes este dato lo usaremos a futuro para definir continentes validos y no estar buscando en los 250 paises
    console.log('Loading continents to the DB...');//cargando continentes a la base de datos
    console.log('');
    const arrayPromisesContinent = [];
    arraycontinents.forEach((name) => {
      arrayPromisesContinent.push(Continent.create({ name: name })
        .then(()=>{
          console.log(green + '>> ' + reset + name + green + ' << Successfully loaded into DB' + reset);//cargado con éxito en db
      }).catch((e)=>{
        console.log('>> Continent: ' + name + e);
      })
      )
    });

    Promise.all(arrayPromisesContinent).then(r => {
      //cuando finalize de cargar los continentes pondremos un texto para avisar que empesaran a cargar los paises
      console.log('');
      console.log('Loading countries to DB...');//cargando países a DB
      console.log('');
    });

    const returnArray = [];
    const arrayPromises = [];
    //crearemos cada pais en nuestra base de datos guardando cada promesa en una array
    arrayCountrys.forEach((country) => {
      arrayPromises.push(Country.create(country)
        .then((r)=>{
          console.log(green + '>> '+ reset + country.name + ': ' + green + 'Successfully loaded into DB' + reset);//cargado con éxito en la DB
          returnArray.push([true, country.name]);
      }).catch((e)=>{
        //guardamos los nombres de paises que tubieron errores para avisar luego
        returnArray.push([false, country.name]);
      }))
    });
    //retornamos el resultado al finalizar todas las promesas agregandole un true para avisar que pudimos terminar todo
    return Promise.all(arrayPromises).then(r => {
      return [ true, returnArray ]
    })
  }
  //si fallo la busqueda retornamos una array con falso y de segundo valor el motivo del error
  return ResultAxios
}


function checkData(result){
  //si la respuesta guarda en el primer valor es true analizaremos los datos guardados en el segundo valor
  if (result[0]) {
    //analizaremos la cantidad de errores para notificarlos por si a futuro hay que hacer alguna revision saber que existen
    let successfullUpload = result[1].filter((exito) => exito[0] === true).length;
    let errors = result[1].filter((error) => error[0] === false);
    let errorsNum = errors.length;
    //si hay errores los listaremos
    if(errorsNum !== 0){
      console.log('');
      console.log(red +'Countries that could NOT be loaded correctly:' + reset);//países que NO se pudieron cargar correctamente
      console.log('');
      errors.forEach(element => {
        console.log('>> ' + element[1]);
      });
    }
    console.log('');
    //mostraremos los totales
    console.log(green + 'TOTAL: ' + successfullUpload + ' countries loaded to DB ' + reset + '/ '+red+'TOTAL: ' + errorsNum + ' countries with error loading in DB' + reset)
    console.log('');
  }
}


module.exports = {
  upData,
  searchData,
  checkData
};

