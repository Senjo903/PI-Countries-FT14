const { Router } = require('express');
const routerCountries = require('./routerCountries');
const routerActivity = require('./routerActivity');
const routerList = require('./routerList');

const router = Router();

// Configurar los routers
router.use('/countries', routerCountries);
router.use('/activity', routerActivity);
router.use('/list', routerList);

module.exports = router;
