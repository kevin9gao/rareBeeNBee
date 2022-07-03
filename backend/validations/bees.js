const { check } = require("express-validator");

const postValidations = [
  check('name')
    .notEmpty()
    .withMessage('Name cannot be empty.')
    .isLength({ max: 256 })
    .withMessage('Name must be no more than 256 characters long.'),
  check('address')
    .notEmpty()
    .withMessage('Address cannot be empty.')
    .isLength({ max: 256 })
    .withMessage('Address must be no more than 256 characters long.'),
  check('city')
    .notEmpty()
    .withMessage('City cannot be empty.')
    .isLength({ max: 100 })
    .withMessage('City must be no more than 100 characters long.'),
  check('state')
    .notEmpty()
    .withMessage('State cannot be empty.')
    .isLength({ max: 100 })
    .withMessage('State must be no more than 100 characters long.'),
  check('country')
    .notEmpty()
    .withMessage('Country cannot be empty.')
    .isLength({ max: 100 })
    .withMessage('Country must be no more than 100 characters long.'),
  check('price')
    .notEmpty()
    .withMessage('Price cannot be empty.')
    .isNumeric()
    .withMessage('Price must be a number.'),
  check('imageUrl')
    .notEmpty()
    .withMessage('Image Url cannot be empty.')
    .isLength({ max: 500 })
    .withMessage('Image Url must be no more than 500 characters long.')
    .custom(value => {
      if (!(value.toLowerCase().endsWith('.jpg') ||
            value.toLowerCase().endsWith('.jpeg') ||
            value.toLowerCase().endsWith('.png'))) {
        return Promise.reject('Image link must be a .PNG, .JPG, or .JPEG.')
      } else return true
    })
];



module.exports = { postValidations };
