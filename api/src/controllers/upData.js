const { Country, Continent } = require('../db.js');
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
    //crearemos una array para guardar los nombres de continente de los paises
    const arraycontinents = [];
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
      //si el continente no esta en nuestra array de continentes lo agregamos hago este paso para evitar hacer 250 findOrCreate en la DB y ahorrar consultas
      if(arraycontinents.includes(country.region) === false){
        arraycontinents.push(country.region);
      }
      return result
    });
    //antes de iniciar a crear cada country crearemos nuestra tabla con continent este dato lo usaremos a futuro para definir continentes validos y no estar buscando en los 250 paises
    console.log('Cargando continentes a la DB...');
    console.log('');
    const arrayPromisesContinent = [];
    arraycontinents.forEach((name) => {
      arrayPromisesContinent.push(Continent.create({name: name})
        .then((r)=>{
          console.log('>> Continente:  ' + name + ' >>  Cargado corectamente en DB')
      }).catch((e)=>{
        //en la e pongo un'' porque de esa forma solo se guarda el texto del error sin tantos detalles.
        console('>> Continente Error: '+e);
      }))
    });
    Promise.all(arrayPromisesContinent).then(r => {
      //cuando finalize de cargar los continentes pondremos un texto para avisar que empesaran a cargar los paises
      console.log('--------------------------------------');
      console.log('');
      console.log('Cargando paises a DB...');
      console.log('');
    });
    const returnArray = [];
    const arrayPromises = [];
    //crearemos cada pais en nuestra base de datos guardando cada promesa en una array
    arrayCountrys.forEach((country) => {
      arrayPromises.push(Country.create(country)
        .then((r)=>{
          console.log('>>  ' + country.name + ':  Cargado corectamente en DB')
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

/*
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
        console.log('>>  ' + country.name + ':  Cargado corectamente en DB')
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
}*/

function checkData(result){
  //analizaremos la cantidad de errores para notificarlos por si a futuro hay que hacer alguna revision saber que existen
  let successfullUpload = result.filter((exito) => exito[0] === true).length;
  let errores = result.filter((error) => error[0] === false).length;
  console.log('TOTAL: ' + successfullUpload + ' Paises cargados a la DB / TOTAL: ' + errores + ' ERRORES al subir los paises')
}

async function checkContinent(newContinet){
  //revisamos si la tabla con el nombre de continente existe sino esta lo creamos
  const [data, created] = await Country.findOrCreate({
    where: { name: newContinet },
  });
  if (created) {
      return true;
  } else {
      return false;
  }
}

module.exports = {
  upData,
  searchData,
  checkData
};

