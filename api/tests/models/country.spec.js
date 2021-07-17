const { Activity, Country, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Country model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  describe('Country model validators', () => {
    beforeEach(() => Country.sync({ force: true }));

    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ name: 'Argentina' });
      });
    });
    describe('ID', () => {
      it('should throw an error if name is null', (done) => {
        Country.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Country.create({ ID: 1 });
      });
    });
  });


});
/*  sequelize.define('country', {
    ID: {
      type: DataTypes.STRING(3),
      allowNull: false,
      primaryKey: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('name', value.toLowerCase());//guardamos el nombre todo en minusculas a futuro esto facilitara las busquedas
      },
      allowNull: false,
    },
    imgURL: {
      type: DataTypes.STRING,
      allowNull: false
    },
    continent: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        this.setDataValue('continent', value.toLowerCase())
      },
    },
    capital: {
      type: DataTypes.STRING,
      allowNull: false
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.STRING,
      //allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER
    }
  },{ timestamps: false });
};*/