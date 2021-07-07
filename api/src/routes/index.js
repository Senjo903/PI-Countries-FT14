const { Router } = require('express');
const routerCountries = require('./routerCountries');
const routerActivity = require('./routerActivity');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', routerCountries);
router.use('/activity', routerActivity);

module.exports = router;
