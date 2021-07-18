const { Activity, Country, conn } = require('../../src/db.js');
const { expect } = require('chai');
/*
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
  imgURL: ''
}
const luchaLibre = {
  name: 'lucha libre',
  difficulty: 3,
  duration: '3 horas.',
  station: 'spring',
  imgURL: ''
}

describe('validación de modelos', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('No se puede conectar a la base de datos:', err);
    }));
  describe('modelo: Country', () => {
    beforeEach(() => Country.sync({ force: true }));
    describe('ID', () => {
      it('ID debe ser unica, no se puede repetir', (done) => {
        Country.create(argentina)
        Country.create(chile)
        Country.create(peru)
        Country.create(argentina)
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
      it('ID no puede ser null', (done) => {
        Country.create({
          ID: null,
          name: 'argentina',
          imgURL: 'https://restcountries.eu/data/arg.svg',
          continent: 'americas',
          capital: 'Buenos Aires',
          subregion: 'South America',
          area: 2780400,
          population: 43590400
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
      it('ID solo debe tener 3 caracteres', (done) => {
        Country.create({
          ID: 'ARGS',
          name: 'argentina',
          imgURL: 'https://restcountries.eu/data/arg.svg',
          continent: 'americas',
          capital: 'Buenos Aires',
          subregion: 'South America',
          area: 2780400,
          population: 43590400
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('name', () => {
      it('name no puede ser null', (done) => {
        Country.create({
          ID: 'ARG',
          name: null,
          imgURL: 'https://restcountries.eu/data/arg.svg',
          continent: 'americas',
          capital: 'Buenos Aires',
          subregion: 'South America',
          area: 2780400,
          population: 43590400
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('imgURL', () => {
      it('imgURL no puede ser null', (done) => {
        Country.create({
          ID: 'CHL',
          name: 'chile',
          imgURL: null,
          continent: 'americas',
          capital: 'Santiago',
          subregion: 'South America',
          area: 756102,
          population: 18191900
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('continent', () => {
      it('continent no puede ser null', (done) => {
        Country.create({
          ID: 'CHL',
          name: 'chile',
          imgURL: 'https://restcountries.eu/data/chl.svg',
          continent: null,
          capital: 'Santiago',
          subregion: 'South America',
          area: 756102,
          population: 18191900
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('capital', () => {
      it('capital no puede ser null', (done) => {
        Country.create({
          ID: 'PER',
          name: 'peru',
          imgURL: 'https://restcountries.eu/data/per.svg',
          continent: 'americas',
          capital: null,
          subregion: 'South America',
          area: 1285216,
          population: 31488700
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
  });

  describe('modelo: Activity', () => {
    beforeEach(() => Activity.sync({ force: true }));
    describe('name', () => {
      it('name no puede ser null', (done) => {
        Activity.create({
          name: null,
          duration: 'todo el dia.',
          station: 'summer',
          difficulty: '3',
          imgURL: 'ddd'
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
      it('name debe ser unico, no se puede repetir', (done) => {
        Activity.create(pesca)
        Activity.create(luchaLibre)
        Activity.create(pesca)
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('station', () => {
      it('station no puede ser null', (done) => {
        Activity.create({
          name: 'pesca',
          duration: 'todo el dia.',
          station: null,
          difficulty: '3',
          imgURL: 'ddd'
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
      it('station solo puede ser: summer, fall, winter, spring', (done) => {
        Activity.create({
          name: 'pesca',
          duration: 'todo el dia.',
          station: 'hola',
          difficulty: '3',
          imgURL: 'ddd'
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
    describe('difficulty', () => {
      it('difficulty no puede ser null', (done) => {
        Activity.create({
          name: 'pesca',
          duration: 'todo el dia.',
          station: 'summer',
          difficulty: null,
          imgURL: 'ddd'
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
      it('difficulty solo puede ser: 1, 2, 3, 4, 5', (done) => {
        Activity.create({
          name: 'pesca',
          duration: 'todo el dia.',
          station: 'summer',
          difficulty: '6',
          imgURL: 'ddd'
        })
          .then(() => done(new Error('No debería haberse creado')))
          .catch(() => done());
      });
    });
  });
});

*/