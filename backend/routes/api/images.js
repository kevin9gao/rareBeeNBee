const express = require('express');
const asyncHandler = require('express-async-handler');
const {
  singleMulterUpload,
  singlePublicFileUpload,
  multipleMulterUpload,
  multiplePublicFileUpload
} = require('../../awsS3');

const db = require('../../db/models');

const router = express.Router();

router.get('/bees/:id', asyncHandler(async (req, res) => {
  const beeId = req.params.id;
  const images = await db.Image.findAll({ where: { beeId } });
  return res.json(images);
}))

router.post(
  '/bees/:id',
  singleMulterUpload('image'),
  asyncHandler(async (req, res) => {
    const beeId = req.params.id;
    const imageUrl = await singlePublicFileUpload(req.file);

    const newImage = await db.Image.create({
      beeId,
      imageUrl,
    });

    return res.json(newImage);
}))

module.exports = router;
