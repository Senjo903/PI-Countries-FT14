const { Activity } = require('../db.js');

async function listActivities() {
    const validActivities = await Activity.findAll({attributes: ['name']}).then((r) => {
        //retornamos una array con las actividades validas
        return r.map((v)=>{ return v.dataValues.name});
    },(e) => {
        return []//hubo un error al cargar las actividades solo retornamos un array sin datos
    })
    return validActivities
}

module.exports = {
    listActivities
};