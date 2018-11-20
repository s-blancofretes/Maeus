const experiencias = require('./experiences');
const moment = require('moment');
var database = require('../functions/database');

exports.obtenerExperienciaSegunHoraDeInicio = function(now) {
    for (let idx in experiencias) {
        const experiencia = experiencias[idx];

        const ahora = now;
        const horaInicio = fechaApartirDeHora(experiencia.horaDesde);
        const horaHasta = fechaApartirDeHora(experiencia.horaHasta);
        console.log(ahora, horaInicio, horaHasta);
        const duracionTotalMs = experiencia.duracionTotal * 60 * 1000;

        const estaDentroDeTiempoExperiencia = ahora > horaInicio && (ahora + duracionTotalMs < horaHasta);
        if (estaDentroDeTiempoExperiencia) {
            return { id: idx, experiencia };
        } else {
            return null;
        }
    }
}


exports.getStoryFromStartTime = function(now) {
    //return experiencias["2"];
    var date = new Date();
    var now = "" + date.getUTCHours() + date.getUTCMinutes();
    var nowInt = parseInt(now, 10);
    if (300 <= nowInt && nowInt <= 859) {
        //console.log("estamos en exp 1");
        return experiencias["1"];
    } else if (900 <= nowInt && nowInt <= 1459) {
        //console.log("estamos en exp 2");
        return experiencias["2"];
    } else if (1500 <= nowInt && nowInt <= 2059) {
        //console.log("esta funcando la experiencia 3")
        return experiencias["3"];
    } else if (2100 <= nowInt && nowInt <= 2359) {
        //console.log("estamos en exp 4");
        return experiencias["4"];
    } else if (0 <= nowInt && nowInt <= 259) {
        //console.log("estamos en exp 4");
        return experiencias["4"];
    }
}

exports.getStoryFromStoryId = function(storyId) {
    return experiencias[storyId];
}

exports.getDialogflowTokenFromChatId = async function(db, chatId) {
    user = await database.findUserByChatId(db, chatId);
    var storyId = user[0].storyId;
    if (storyId == 1) {
        return "tokenAnton"
    } else if (storyId == 2) {
        return "f2c76dd2bad6464db2e32febf8de6281"
    } else if (storyId == 3) {
        return "tokenSilvina"
    } else if (storyId == 4) {
        return "tokenDamian"
    }
}

function fechaApartirDeHora(hora) {
    const splitted = hora.split(":");
    const now = new Date();
    console.log(hora);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), splitted[0], splitted[1]);
}