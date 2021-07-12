const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const { listActivities } = require('../controllers/ctrlActivities.js');
const router = Router();

router.post('/', async (req, res) =>{
    const { name, difficulty, duration, station, countries } = req.body;
    //primero verificaremos que todos los datos tengan informacion
    if (name && difficulty && duration && station && countries ){
        //ahora revisaremos que las datos con valores fijos sean validos
    if (parseInt(difficulty) === 1 || parseInt(difficulty) === 2||  parseInt(difficulty) === 3|| parseInt(difficulty) === 4|| parseInt(difficulty) === 5) {
        if (station === 'summer' || station === 'fall' ||  station === 'winter' || station === 'spring') {
            //revisamos que todos los paises sean validos y los que no los retiraremos del array countries si el array queda con 1 dato seguimos sino avisamos que no hay paises validos
            const promisesArray = [];
            countries.forEach( countryID => {
                if (countryID.length === 3){
                    //guardamos todas las promesas de busqueda de resultado en una array
                    promisesArray.push(Country.findOne({ where: { ID: countryID.toUpperCase() }})
                        .then((r) => {
                            if (r === null){
                                //si no allamos valor retornaremos falso para evitar que guarde el resultado en los datos valido
                                return [false]
                            }
                            return [true, r.ID]
                        }).catch((e) => {
                            console.log('hubo un errro: ' + e)
                            return [false, e]
                        }))
                }
            });
            const countriesValid = await Promise.all(promisesArray).then((result) => {
                const resultsValid = []
                result.forEach((r) => {
                    //si es true el resultado de country es valido porque existe y lo guadaremos para retornarlo
                    if (r[0]) {
                        //si el valor ya fue ingresado no ingresara denuevo de esta forma no se repetira
                        if(resultsValid.includes(r[1]) === false){
                            resultsValid.push(r[1]);
                        }
                    }
                });
                return resultsValid;
            } )
            // si countriesValid es mayor que 0 significa que tenemos valores validos y podemos seguir sino retornaremos valor no valido
            if (countriesValid.length > 0) {
                //revisamos que name no este ocupado si lo esta avisaremos
                const availability = await Activity.findOne({ where: { name: name } }).catch((e) =>{ console.log('hubo un errro: ' + e)});
                if (availability === null){
                    return Activity.create({ name: name, difficulty: difficulty, duration: duration, station: station}, { include: [Country] })
                        .then((activityResult)=>{
                        //una ves eteado la actividd con todos los paises que tiene relacion la retornamos
                        return activityResult.setCountries(countriesValid);
                        }).then((r) => {
                            //una ves eteado la actividd con todos los paises que tiene relacion la retornamos
                            return res.json(r);
                        })
                        .catch((e)=>{
                            // si hay error retornamos el error para avisar
                            return res.status(404).json({ error: e });
                        });
                } else {
                    //notificamos que la actividad ya existe
                    return res.status(404).send('la actividad ya existe');
                }
            }
        }
    }
    return res.send('datos invalidos');
    } else {
        return res.send('faltan datos');
    }
});

router.get('/:idActivity', async(req, res) =>{
    let activityID = req.params.idActivity;
        return Activity.findByPk(activityID, {include: [Country]})
            .then((r) => {
            if(r === null){
                return res.status(404).json({ error: 'registro no encontrado' })
            }
            return res.json(r)
            }, (e) => {
            return res.status(404).json({ error: e+'' });
            })

    return res.status(404).json({ error: 'dato invalido debe tener 3 caracteres en mayuscula' });
});

module.exports = router;
