'use strict';
module.exports = (sequelize, DataTypes) => {
  const Locale = sequelize.define('Locale', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    iconUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
  }, {});
  Locale.associate = function(models) {
    // associations can be defined here
  };
  return Locale;
};
