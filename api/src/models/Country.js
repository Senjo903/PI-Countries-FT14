const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
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
      allowNull: false,
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
      allowNull: false,
    },
    subregion: {
      type: DataTypes.STRING
    },
    area: {
      type: DataTypes.INTEGER,
      //allowNull: false,
    },
    population: {
      type: DataTypes.INTEGER
    }
  },{ timestamps: false });
};