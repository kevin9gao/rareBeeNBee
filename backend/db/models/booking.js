'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    beeId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    beeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.NUMERIC,
      allowNull: false
    }
  }, {});
  Booking.associate = function(models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: 'userId' })
    Booking.belongsTo(models.Bee, { foreignKey: 'beeId' })
  };
  return Booking;
};
