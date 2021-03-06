const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('activity', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      set(value) {
        this.setDataValue('name', value.toLowerCase());
      }
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    station: {
        type: DataTypes.ENUM('summer', 'fall', 'winter', 'spring'),
        allowNull: false,
    },
    difficulty: {
        type: DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false,
    },
    imgUrl: {
      type: DataTypes.STRING
    },
  }, { timestamps: false });
};