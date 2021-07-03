const { Router } = require('express');

const router = Router();

router.get('/', (req, res) =>{
    res.send('hola');
});

router.get('/:idPais', (req, res) =>{
    res.send('hola');
});

router.get('/countries?name=', (req, res) =>{
    res.send('hola');
});

module.exports = router;