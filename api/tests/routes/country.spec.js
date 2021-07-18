/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Continent, Activity, Country, conn } = require('../../src/db.js');

const agent = session(app);

const argentina = {
  ID: 'ARG',
  name: 'argentina',
  imgURL: 'https://restcountries.eu/data/arg.svg',
  continent: 'americas',
  capital: 'Buenos Aires',
  subregion: 'South America',
  area: 2780400,
  population: 43590400
}
const chile = {
  ID: 'CHL',
  name: 'chile',
  imgURL: 'https://restcountries.eu/data/chl.svg',
  continent: 'americas',
  capital: 'Santiago',
  subregion: 'South America',
  area: 756102,
  population: 18191900
}
const peru = {
  ID: 'PER',
  name: 'peru',
  imgURL: 'https://restcountries.eu/data/per.svg',
  continent: 'americas',
  capital: 'Lima',
  subregion: 'South America',
  area: 1285216,
  population: 31488700,
}
const pesca = {
  name: 'pesca',
  difficulty: 3,
  duration: 'todo el dia.',
  station: 'summer',
  countries: ["arg"],
  imgURL: ''
}
const luchaLibre = {
  name: 'lucha libre',
  difficulty: 3,
  duration: '3 horas.',
  station: 'spring',
  countries: ["arg"],
  imgURL: ''
}
const urlOne = '/countries?filter=continent&options=all&tipeOrden=name&order=DESC&page=1'
const urlOneFake = '/countriess?filter=continent&options=all&tipeOrden=name&order=DESC&page=1'

describe('Ruta: Country', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos o falta alguno', err);
  }));
  beforeEach(() => Country.sync({ force: true })
    .then(() => {
      Country.create(argentina)
      Country.create(peru)
      Country.create(chile)
    }));
  describe('GET /countries', () => {
    it('debería obtener 404 si no se envian bien los datos', () =>
      agent.get(urlOneFake).expect(404)
    );
  });
  describe('GET /countries', () => {
    it('debería obtener 200', () =>
      agent.get(urlOne).expect(200)
    );
  });
  describe('GET /countries/:idPais', () => {
    it('debería obtener 404 si no se envian ID', () =>
      agent.get('/countries/').expect(404)
    );
  });
  describe('GET /countries/:idPais', () => {
    it('debería obtener 404 si el ID enviado es mayor a 3 caracteres', () =>
      agent.get('/countries/ARGS').expect(404)
    );
  });
  describe('GET /countries/:idPais', () => {
    it('debería obtener 200', () =>
      agent.get('/countries/ARG').expect(200)
    );
  });
  describe('GET /countries?name=', () => {
    it('debería obtener la propiedad RESULTS en un JSON con valor 0 si no hay coincidencia', () =>
      agent.get('/countries?name=abc')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.deep.equal({ results: 0, msj: [] });
    })
    );
  });
  describe('GET /countries?name=', () => {
    it('debe poder enviarse parte del nombre y obtener resultados que coincidan', () =>
      agent.get('/countries?name=ar')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.deep.equal({ results: 1, msj: [{ ID: "ARG", name: "argentina" }]});
    })
    );
  });
});

describe('Ruta: List', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('No se puede conectar a la base de datos o falta alguno', err);
  }));
  beforeEach(() => Activity.sync({ force: true })
    .then(() => {
      Activity.create(pesca)
      Activity.create(luchaLibre)
    }));
  describe('GET /list/activities', () => {
    it('la ruta devuelve un array con el listado de las actividades, si no hay valores devuelve un array vacio', () =>
      agent.get('/list/activities')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.deep.equal([{ ID: 1, name: "pesca" }, { ID: 2, name: "lucha libre" }]);
    })
    );
  });
  beforeEach(() => Continent.sync({ force: true })
    .then(() => {
      Continent.create({ name: 'asia' })
      Continent.create({ name: 'europe' })
    }));
  describe('GET /list/continent', () => {
    it('la ruta devuelve un array con el listado de continentes, si no hay valores devuelve un array vacio', () =>
      agent.get('/list/continent')
      .expect(200)
      .expect((res) => {
        expect(res.body).to.be.deep.equal([{ ID: 1, name: "asia" }, { ID: 2, name: "europe" }]);
    })
    );
  });
});