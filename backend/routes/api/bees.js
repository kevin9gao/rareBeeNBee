const express = require('express');
const asyncHandler = require('express-async-handler');

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

  return res.redirect(`/api/bees/${newBee.id}`);
}))

module.exports = router;
