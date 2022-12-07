const express = require('express');
const asyncHandler = require('express-async-handler');

const db = require('../../db/models');

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  const locales = await db.Locale.findAll();
  return res.json(locales);
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const locale = await db.Locale.findByPk(req.params.id);
  return res.json(locale);
}))

module.exports = router;
