const { Router } = require('express');
const router = Router();
const { Continent, Activity } = require('../db.js');

router.get('/:nameList', async(req, res) =>{
    let nameList = req.params.nameList;
    if(nameList === 'continent'){
        return Continent.findAll({attributes: ['ID','name']})
            .then((r) => {
                if(r === null){
                    return res.status(404).json({ error: 'record not found' });//registro no encontrado
                }
                return res.json(r)
            }, (e) => {
                return res.status(404).json({ error: 'search could not be performed' });//no se pudo realizar la búsqueda
            })
    }
    if(nameList === 'activities'){
        return  Activity.findAll({attributes: ['ID','name']})
            .then((r) => {
                if(r === null){
                    return res.status(404).json({ error: 'record not found' });//registro no encontrado
                }
                return res.json(r)
            }, (e) => {
                return res.status(404).json({ error: 'search could not be performed' });//no se pudo realizar la búsqueda
            })
    }
    return res.status(404).json({ error: 'Invalid data' });//datos inválidos
});

module.exports = router;