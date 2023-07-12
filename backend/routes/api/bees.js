const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { postValidations } = require('../../validations/bees');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload
} = require('../../awsS3');

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

// TODO - validations for post
router.post(
  '/',
  singleMulterUpload('image'),
  postValidations,
  asyncHandler(async (req, res) => {
  // console.log('got to backend post route');
  const {
    name,
    address,
    city,
    state,
    country,
    localeId,
    price,
    description,
    details,
    userId
  } = req.body;

  const imageUrl = await singlePublicFileUpload(req.file);

  // console.log('backend, before create: ', name,
  //   address,
  //   city,
  //   state,
  //   country,
  //   price,
  //   imageUrl,
  //   userId)

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const newBee = await db.Bee.create({
      name,
      address,
      city,
      state,
      country,
      localeId,
      price,
      imageUrl,
      description,
      details,
      userId
    });

    return res.json(newBee);
  } else {
    const errors = validatorErrors.array().map(error => error.msg);
    return res.json(errors);
  }
}))

// router.put('/:id', postValidations, asyncHandler(async (req, res) => {
router.put('/:id', asyncHandler(async (req, res) => {
  // console.log('got to backend put route');
  const {
    name,
    address,
    city,
    state,
    country,
    localeId,
    price,
    imageUrl,
    description,
    details,
    userId,
  } = req.body.payload;

  const { beeId } = req.body;

  // console.log('backend req.body: ', req.body);
  // console.log('backend variables: ', name, address, city, state, country, price, imageUrl, userId);
  // console.log('backend beeId: ', beeId);

  const bee = await db.Bee.findByPk(beeId);

  // const validatorErrors = validationResult(req.body);
  // console.log('validatorErrors put route: ', validatorErrors);

  // console.log('backend after findByPk, bee: ', bee);

  // if (validatorErrors.isEmpty()) {
  await db.Bee.update({
    name,
    address,
    city,
    state,
    country,
    localeId,
    price,
    imageUrl,
    description,
    details,
    userId
  }, { where: { id: beeId } });

  const updatedBee = await db.Bee.findByPk(beeId);

  // console.log('backend after update, updatedBee: ', updatedBee);

  res.json(updatedBee);
  // } else {
  //   const errors = validatorErrors.array().map(error => error.msg);
  //   console.log('put route errors (got to else): ', errors);
  //   return res.json(errors);
  // }
}))

router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const bee = await db.Bee.findByPk(id);

  console.log('backend bee router id', id, 'bee', bee)

  if (!bee) throw new Error('Cannot find bee.')

  await db.Bee.destroy({ where: { id } });
  res.json({ id });
}))


module.exports = router;
