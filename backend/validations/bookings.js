const { check } = require('express-validator');

const bookingValidations = [
  check('startDate')
    .notEmpty()
    .withMessage('Please provide a start date.')
    .isAfter((new Date()).toDateString())
    .withMessage('Start date must be in the future.'),
  check('endDate')
    .notEmpty()
    .withMessage('Please provide an end date.')
    .custom((value, { req }) => {
      if (new Date(value) <= new Date(req.body.startDate)) {
        throw new Error('End date must be after start date.')
      }
      return true;
    })
];

module.exports = { bookingValidations };
