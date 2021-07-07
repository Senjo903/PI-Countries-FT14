const { Router } = require('express');
const router = Router();
const { Country } = require('../db.js');
const { getGenerator, dataValidation } = require('../controllers/ctrlCountries.js');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

router.get('/', async(req, res) =>{
    if(!req.query.name){// si no hay query toma la ruta /countries
        const {filter, options, tipeOrden, order, page} = req.body;
        //primero validaremos la info obtenida con nuestra funcion y segun si tira falso o verdadero seguimos o tiramos una respuesta error
        const resultValidation = await dataValidation(filter, options, tipeOrden, order, page);
        if (resultValidation === false) {
            // si da falso hubo algun error y lo notificamos
            return res.status(404).json({ error: 'hay datos invalidos o sin completar' });
        }
        //usaremos una funcion generadora para buscar el resultado y retornarlo
        const result = await getGenerator(filter, options, tipeOrden , order,  page);
        if(result[0]){
            //si salio todo bien enviamos el resultado;
            return res.json(result[1]);
        } else {
            //si fallo enviamos el error
            return res.status(404).send({ error: result[1]});
        }

    } else { // si hay query toma la ruta  /countries?name="..." y se buscara todos los country que contenga ese dato en el nombre

        const namefragment = req.query.name.toLowerCase();
        return await Country.findAll({
            where: {name: { [Op.like]: `${namefragment}%` } },
            attributes: ['ID', 'name']
            })
            .then((r) => {
                let num = 0;
                if(r === null){
                    return res.json({results: 0, msj: 'sin coincidencias' })
                }
                let result = r.map((v)=> {
                    num++;
                    return {ID:v.ID, name: v.name}
                })
                return res.json({ results: num, msj: result });
            }, (e) => {
                return res.status(404).json({ error: e+'' });
            })
    }
});

router.get('/:idPais', async(req, res) =>{
    let countryID = req.params.idPais;
    if(countryID.length === 3){
        return Country.findOne({
            where: { ID: countryID.toUpperCase() },
            attributes: ['ID', 'name', 'imgURL', 'continent', 'capital', 'subregion', 'area', 'population']
            })
            .then((r) => {
                if(r === null){
                    return res.status(404).json({ error: 'registro no encontrado' })
                }
                return res.json(r)
            }, (e) => {
                return res.status(404).json({ error: e+'' });
            })
    }
    return res.status(404).json({ error: 'dato invalido debe tener 3 caracteres en mayuscula' });
});

module.exports = router;