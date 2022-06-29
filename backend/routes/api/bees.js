const express = require('express');
const asyncHandler = require('express-async-handler');
const { check, validationResult } = require('express-validator');

const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const bees = await db.Bee.findAll();
  return res.json(bees);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const bee = await db.Bee.findByPk(req.params.id);
  return res.json(bee);
}))

const postValidations = [
  check('name')
    .notEmpty()
    .withMessage('Name cannot be empty.')
    .isLength({ min: 3, max: 256 })
    .withMessage('Name must be between 3 and 256 characters long.'),
  check('address')
    .notEmpty()
    .withMessage('Address cannot be empty.')
    .isLength({ min: 3, max: 256 })
    .withMessage('Address must be between 3 and 256 characters long.'),
  check('city')
    .notEmpty()
    .withMessage('City cannot be empty.')
    .isLength({ min: 3, max: 100 })
    .withMessage('City must be between 3 and 100 characters long.'),
  check('state')
    .notEmpty()
    .withMessage('State cannot be empty.')
    .isLength({ min: 2, max: 100 })
    .withMessage('State must be between 2 and 100 characters long.'),
  check('country')
    .notEmpty()
    .withMessage('Country cannot be empty.')
    .isLength({ min: 3, max: 100 })
    .withMessage('Country must be between 3 and 100 characters long.'),
  check('price')
    .notEmpty()
    .withMessage('Price cannot be empty.')
    .isNumeric()
    .withMessage('Price must be a number.'),
  check('imageUrl')
    .notEmpty()
    .withMessage('Image Url cannot be empty.')
    .isLength({ min: 3, max: 500 })
    .withMessage('Image Url must be between 3 and 500 characters long.')
  // .custom(value => {
  //   switch ()
  // }),
];

// TODO - validations for post
router.post('/', asyncHandler(async (req, res) => {
  const {
    name,
    address,
    city,
    state,
    country,
    price,
    imageUrl,
    userId
  } = req.body;

  console.log('backend, before create: ', name,
    address,
    city,
    state,
    country,
    price,
    imageUrl,
    userId)

  const newBee = await db.Bee.create({
    name,
    address,
    city,
    state,
    country,
    price,
    imageUrl,
    userId
  });

  res.json(newBee);
}))

router.put('/:id', asyncHandler(async (req, res) => {
  const {
    name,
    address,
    city,
    state,
    country,
    price,
    imageUrl,
    userId,
  } = req.body.payload;

  const { beeId } = req.body;

  // console.log('backend req.body: ', req.body);
  // console.log('backend variables: ', name, address, city, state, country, price, imageUrl, userId);
  // console.log('backend beeId: ', beeId);

  const bee = await db.Bee.findByPk(beeId);

  // console.log('backend after findByPk, bee: ', bee);

  await db.Bee.update({
    name,
    address,
    city,
    state,
    country,
    price,
    imageUrl,
    userId
  }, { where: { id: beeId } });

  const updatedBee = await db.Bee.findByPk(beeId);

  // console.log('backend after update, updatedBee: ', updatedBee);

  res.json(updatedBee);
}))

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bee = await db.Bee.findByPk(id);
  if (!bee) throw new Error('Cannot find bee.')

  await db.Bee.destroy({ where: { id } });
  res.json({ id });
}))

module.exports = router;
