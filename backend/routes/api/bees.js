const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const bees = await db.Bee.findAll();
  return res.json(bees);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const bee = await db.Bee.findOne({
    where: id === req.params.id
  });
  return res.json(bee);
}))



module.exports = router;
