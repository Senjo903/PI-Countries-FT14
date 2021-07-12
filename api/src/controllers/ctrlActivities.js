const { Activity } = require('../db.js');

async function listActivities() {
    const validActivities = await Activity.findAll({attributes: ['name']}).then((r) => {
        //retornamos una array con las actividades validas
        return r.map((v)=>{ return v.dataValues.name});
    },(e) => {
        console.log('hay un error al cargar los continentes: '+ e);
        return []
    })
    console.log(validActivities+'<<<')
    return validActivities
}

module.exports = {
    listActivities
};