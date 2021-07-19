const { Router } = require('express');
const { Country, Activity } = require('../db.js');
const router = Router();

router.post('/', async (req, res) =>{
    const { name, difficulty, duration, station, countries, imgUrl } = req.body;
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
                            return [false]
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
                const availability = await Activity.findOne({ where: { name: name } });
                if (availability === null){
                    //si el nombre no esta ocupado ya podemos crear la nueva actividad
                    return Activity.create({ name: name, difficulty: difficulty, duration: duration, station: station, imgUrl:imgUrl }, { include: [Country] })
                        .then(async(activityResult)=>{
                        //seteamos la actividad la actividd con todos los paises
                        //return activityResult.setCountries(countriesValid);
                        let resultSet = await activityResult.setCountries(countriesValid);
                        //una ves seteada la actividd, la retornamos
                        return res.status(201).json({activity: activityResult, countries: resultSet[0].map((country)=>{return country.countryID})});
                        })
                        .catch((e)=>{
                            // si hay error notificamos
                            return res.status(404).json({ error: 'an error occurred and the activity could not be logged' });//ocurrió un error y no se pudo registrar la actividad.
                        });
                } else {
                    //notificamos que la actividad ya existe
                    return res.status(404).json({ error: 'The activity already exists' });//la actividad ya existe
                }
            }
        }
    }
    return res.status(404).json({ error: 'There is invalid data' });//hay datos inválidos
    } else {
        return res.status(404).json({ error: 'There is incomplete data' });//hay datos incompletos
    }
});

router.get('/:name', async(req, res) =>{
    let nameActivity = req.params.name;
    return Activity.findOne({ where: { name: nameActivity.toLowerCase() }, include : [{ model: Country, attributes: ['ID','name','imgURL']}] })
        .then((r) => {
        return res.json(r)
        }, (e) => {
        return res.status(404).json({ error: 'there was an error when making the query' });//hubo un error al realizar la consulta
        })

});

module.exports = router;