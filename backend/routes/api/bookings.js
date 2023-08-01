const express = require('express');
const asyncHandler = require('express-async-handler');
const { validationResult } = require('express-validator');
const { bookingValidations } = require('../../validations/bookings');

const db = require('../../db/models');

const router = express.Router();

router.post('/', bookingValidations, asyncHandler(async (req, res) => {
  const {
    startDate,
    endDate,
    beeName,
    location,
    price,
    totalPrice,
    userId,
    beeId
  } = req.body;

  const validatorErrors = validationResult(req);

  if (validatorErrors.isEmpty()) {
    const newBooking = await db.Booking.create({
      startDate,
      endDate,
      beeName,
      location,
      price,
      totalPrice,
      userId,
      beeId
    });

    return res.json(newBooking);
  } else {
    const errors = validatorErrors.array().map(error => error.msg);
    return res.json(errors);
  }
}))

router.get('/:userId', asyncHandler(async (req, res) => {
  // console.log('got to backend users router');

  const { userId } = req.params;

  // console.log('req.params :', req.params);
  // console.log('userId :', userId);

  const bookings = await db.Booking.findAll(
    {
      where: { userId }
    }
  );

  // console.log('bookings', bookings);

  return res.json(bookings);
}))

router.delete('/:bookingId', asyncHandler(async (req, res) => {
  const { bookingId } = req.params;

  const booking = await db.Booking.findByPk(bookingId);
  if (!booking) throw new Error('Cannot find booking.');

  await db.Booking.destroy({ where: { id: bookingId } });
  res.json({ bookingId });
}))



module.exports = router;
