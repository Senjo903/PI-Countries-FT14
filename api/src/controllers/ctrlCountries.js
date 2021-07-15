const { Country, Activity, Continent } = require('../db.js');
const { listActivities } = require('./ctrlActivities.js');
const { Op } = require("sequelize");

async function dataValidation(filter, options, tipeOrden, order, page) {
    //primero revisamos que filter, tipeOrden, orden y page sean valores validos
    if (tipeOrden === 'name' || tipeOrden === 'population') {
        if (order === 'ASC' || order === 'DESC'){
            if (isNaN(page) === false && parseInt(page) >= 0) {
                //si filter es continent revisamos que options sea valido para continent
                if ( filter === 'continent') {
                    //buscaremos los continentes validos en la DB para poder comparar si es valido el continente recibido
                    const listContinentsResult = await listContinents();
                    if(options.toLowerCase() === 'all' || listContinentsResult.includes(options.toLowerCase())){
                        // todos los datos son validos devolvemos true
                        return true;
                    }
                } else if( filter === 'activities'){
                    //si filter es activities revisamos que options sea valido para activities
                    const listActivitiesResult = await listActivities();
                    if(options.toLowerCase() === 'all' || listActivitiesResult.includes(options.toLowerCase())){
                        // todos los datos son validos devolvemos true
                        return true;
                    }
                }
            }
        }
    }
    //si algun argumento no es valido retornamos false
    return false
}

async function getGenerator(filter, options, tipeOrden, order, page) {
    if ( filter === 'continent') {
        var searchContinent = {
            order: [[ tipeOrden , order]],
            limit: 10,
            offset: (page-1)*10
        };
        //si no se ellijen todos los continentes agregamos para especificar la busqueda de que continente
        if(options.toLowerCase() !== 'all'){
            searchContinent.where = { continent: options.toLowerCase() };
        }
        const resultContinents = await Country.findAndCountAll(searchContinent)
        .then((r)=>{
            //cambiamos valores para que sean mas faciles de leer en el resultado
            let newResult = {};
            newResult.count = r.count;
            newResult.numberPages = Math.ceil(parseInt(r.count)/10)
            newResult.ActualPage = (page);
            newResult.pageResult = r.rows;
            return [true, newResult]
        }).catch((e)=>{
            return [false]
        });
        return resultContinents;
    } else {
        var searchActivity = {
            order: [[ tipeOrden , order]],
        };
        if (options.toLowerCase() === 'all') {
            searchActivity.include = [{ model: Activity, as:'ConAct', attributes: ['ID','name'], where: { name: { [Op.not]: null } } }];
        } else {
            searchActivity.include = [{ model: Activity, as:'ConAct', attributes: ['ID','name'], where: { name: options } }];
        }
        const resultActivities = await Country.findAll(searchActivity)
        .then((r)=>{
            //cambiamos valores para que sean mas faciles de leer en el resultado
            let newResult = {};
            newResult.count = r.length;
            newResult.numberPages = Math.ceil(parseInt(r.length)/10)
            newResult.ActualPage = (page);
            if(page > Math.ceil(parseInt(r.length)/10)) {
                r = [];
            } else {
                r = r.slice((0 + ((page-1)*10)),(10 + ((page-1)*10)));
            }
            newResult.pageResult = r;
            return [true, newResult]
        }).catch((e)=>{
            return [false]
        });
        return resultActivities
    }
}

async function listContinents() {
    const validContinents = await Continent.findAll({attributes: ['name']}).then((r) => {
        //retornamos una array con los contienentes validos
        return r.map((v)=>{ return v.dataValues.name});
    },(e) => {
        return []//hubo un error al cargar los continentes asi que solo retornamos un array sin datos
    })
    return validContinents
}

module.exports = {
    dataValidation,
    getGenerator,
    listContinents
};