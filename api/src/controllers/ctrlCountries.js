const { Country, activities, Continent } = require('../db.js');

async function getGenerator(continent, activities, tipeOrden, order, page) {
    var searchWhere = {
        //atributes: ['name'],
        order: [[ tipeOrden , order]],
        limit: 10,
        offset: (page-1)*10
    };
    //si no se ellijen todos los continentes agregamos para especificar la busqueda de que contienete
    if (continent !== 'ALL') {
       searchWhere.where = { continent: continent };
    }

    if (activities !== 'ALL'){

    }
    return await Country.findAndCountAll(searchWhere)
        .then((r)=>{
            //cambiamos valores para que sean mas faciles de leer en el resultado
            let newResult = {};
            newResult.count = r.count;
            newResult.numberPages = Math.ceil(parseInt(r.count)/10)
            newResult.ActualPage = (page);
            newResult.pageResult = r.rows;
            return newResult;
        }).catch((e)=>{
            return e
        });
}

async function dataValidation(continent, activities, tipeOrden, order, page) {
    //primero revisamos que tipeOrden, orden y page sean valores validos
    if (tipeOrden === 'name' || tipeOrden === 'population'){
        if (order === 'ASC' || order === 'DESC'){
            if (isNaN(page) === false && parseInt(page) >= 0){
                //buscaremos los continentes validos en la DB para poder compara si es valido el continente recibido
                const listContinentsResult = await listContinents();
                //revisamos si continent es valido
                if(continent === 'ALL' || listContinentsResult.includes(continent)){
                    //buscaremos las actividades validas en la DB para poder compara si es valido la avtividad recibida
                    const listActivitiesResult = listActivities();
                    //revisamos si la actividad es valido
                    if(activities === 'ALL' || listActivitiesResult.includes(activities)){

                        // ser todos los argumentos validos enviamos true
                        return true
                    }
                }
            }
        }
    }
    //si algun argumento no es valido retornamos false y los datos a devolver
    return false
}

async function listContinents() {
    const validContinents = await Continent.findAll({attributes: ['name']}).then((r) => {
        //retornamos una array con los contienentes validos
        return r.map((v)=>{ return v.dataValues.name});
    },(e) => {
        console.log('hay un error al cargar los continentes: '+ e);
    })
    return validContinents
}

function listActivities() {
    return ['Pelea en barro', 'nado', 'pesca']
}

module.exports = {
    dataValidation,
    getGenerator,
    listContinents
};