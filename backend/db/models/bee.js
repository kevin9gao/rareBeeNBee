'use strict';
module.exports = (sequelize, DataTypes) => {
  const Bee = sequelize.define('Bee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 256]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 100]
      }
    },
    price: {
      type: DataTypes.NUMERIC(10,2),
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 500]
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING(256),
    },
    details: {
      type: DataTypes.STRING(1000),
    }
  }, {});
  Bee.associate = function(models) {
    // associations can be defined here
    Bee.belongsTo(models.User, { foreignKey: 'userId' })
    Bee.hasMany(models.Booking, { foreignKey: 'beeId' })
    Bee.hasMany(models.Image, { foreignKey: 'beeId' })
  };
  return Bee;
};
