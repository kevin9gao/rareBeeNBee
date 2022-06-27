const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const beesRouter = require('./bees');

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/bees', beesRouter);


module.exports = router;
