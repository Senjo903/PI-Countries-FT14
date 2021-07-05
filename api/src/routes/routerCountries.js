const { Router } = require('express');
const router = Router();
const { Country } = require('../db.js');
const { getGenerator, dataValidation } = require('../controllers/ctrlCountries.js');

router.get('/', async(req, res) =>{
    const {continent, activities, tipeOrden, order, page} = req.body;
    //primero validaremos la info obtenida con nuestra funcion y segun si tira falso o verdadero seguimos o tiramos una respuesta error
    const resultValidation = await dataValidation(continent, activities, tipeOrden, order, page);
    if (resultValidation === false) {
        // si da falso hubo algun error y lo notificamos
        return res.status(404).json({ error: 'hay datos invalidos o sin completar' });
    }
    //usaremos una funcion generadora para buscar el resultado y retornarlo
    getGenerator(continent, activities, tipeOrden , order,  page)
        .then((result) => {
            //si salio todo bien enviamos el resultado;
            return res.json(result);
        },(error) => {
        //si fallo enviamos el error
        return res.status(500).json(error);
        })
});

router.get('/:idPais', (req, res) =>{
    res.send('hola');
});

router.get('/countries?name=', (req, res) =>{
    res.send('hola');
});

module.exports = router;