const { Country } = require('../db.js');
const axios = require('axios');

//cargando db por primera ves si ya hay datos no ara nada solo avisar
async function searchData() {
    //revisamos si la tabla de paises tiene datos
    const data = await Country.findOne();
    if (data === null) {
        return false;
    } else {
        return true;
    }
}

async function upData() {
    //con axios obtenemos los datos de paises
    const ResultAxios = await axios.get('https://restcountries.eu/rest/v2/all')
    //en una array pondremos todos los paises obtenidos de la api como objetos ya listos para integrar a nuestra DB
    const arrayCountrys = Object.values(ResultAxios)[5].map((country) => {
      //solo guardaremos los datos usandos para la ruta principal
      let result = {
        ID: country.alpha3Code,
        name: country.name,
        imgURL: country.flag,
        continent: country.region,
        capital: country.capital,
        subregion: country.subregion,
        area: country.area,
        population: country.population
      }
      return result
    });
    console.log('Cargando paises a DB...');
    console.log('');
    const returnArray = [];
    const arrayPromises = [];
    //crearemos cada pais en nuestra base de datos guardando cada promesa en una array
    arrayCountrys.forEach((country) => {
      arrayPromises.push(Country.create(country)
        .then((r)=>{
          returnArray.push([true, country.name]);
      }).catch((e)=>{
        //en la e pongo un'' porque de esa forma solo se guarda el texto del error sin tantos detalles.
        returnArray.push ([false, e+'']);
      }))
    });
    //retornamos el resultado al finalizar de ejecutar todas las promesas
    return Promise.all(arrayPromises).then(r => {
      return returnArray
    })
}

function checkData(result){
  //analizaremos la cantidad de errores para notificarlos por si a futuro hay que hacer alguna revision saber que existen
  let successfullUpload = result.filter((exito) => exito[0] === true).length;
  let errores = result.filter((error) => error[0] === false).length;
  console.log('TOTAL: ' + successfullUpload + ' Paises cargados a la DB / TOTAL: ' + errores + ' ERRORES al subir los paises')
}

module.exports = {
  upData,
  searchData,
  checkData
};

