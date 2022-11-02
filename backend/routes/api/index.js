const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const beesRouter = require('./bees');
const bookingsRouter = require('./bookings');
const imagesRouter = require('./images');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/bees', beesRouter);

router.use('/bookings', bookingsRouter);

router.use('/images', imagesRouter);


module.exports = router;
