const { Router } = require('express');
const router = Router();
const { Continent, Activity } = require('../db.js');

router.get('/:nameList', async(req, res) =>{
    let nameList = req.params.nameList;
    if(nameList === 'continent'){
        return Continent.findAll()
            .then((r) => {
                if(r === null){
                    return res.status(404).json({ error: 'registro no encontrado' })
                }
                return res.json(r)
            }, (e) => {
                return res.status(404).json({ error: e+'' });
            })
    }
    if(nameList === 'activities'){
        return  Activity.findAll()
            .then((r) => {
                if(r === null){
                    return res.status(404).json({ error: 'registro no encontrado' })
                }
                return res.json(r)
            }, (e) => {
                return res.status(404).json({ error: e+'' });
            })
    }
    return res.status(404).json({ error: 'dato invalido' });
});

module.exports = router;