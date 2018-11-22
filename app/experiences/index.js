const experiencias = require('./experiences');
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
    var date = new Date();
    var now = "" + date.getUTCHours() //+ date.getUTCMinutes();
    var nowInt = parseInt(now, 10);

    if (7 <= nowInt && nowInt < 14) {
        //console.log("estamos en exp 1");
        return experiencias["1"];
    } else if (14 <= nowInt && nowInt < 20) {
        console.log("estamos en exp 2");
        return experiencias["2"];
    } else if (20 <= nowInt && nowInt < 24) {
        //console.log("esta funcando la experiencia 3")
        return experiencias["3"];
    } else if (0 <= nowInt && nowInt < 1) {
        //console.log("esta funcando la experiencia 3")
        return experiencias["3"];
    } else if (1 <= nowInt && nowInt < 7) {
        //console.log("estamos en exp 4");
        return experiencias["4"];
    }
}

exports.getStoryFromStoryId = function(storyId) {
    return experiencias[storyId];
}

exports.getMaxMessageLength = function() {
    var lengthOne = experiencias["1"].messages.length;
    var lengthTwo = experiencias["2"].messages.length;
    var lengthThree = experiencias["3"].messages.length;
    var lengthFour = experiencias["4"].messages.length;
    return Math.max(lengthOne, lengthTwo, lengthThree, lengthFour);
}

exports.getTotalMsgByStoryId = function(storyId) {
    return experiencias[storyId].messages.length;
}

exports.getDialogflowTokenFromChatId = async function(db, chatId) {
    user = await database.findUserByChatId(db, chatId);
    var storyId = user[0].storyId;
    if (storyId == 1) {
        return "b16833c77d57450c9f603eb700d45967"
    } else if (storyId == 2) {
        return "f2c76dd2bad6464db2e32febf8de6281"
    } else if (storyId == 3) {
        return "a24cfe0e79dd465a8b0c091052b3ab40"
    } else if (storyId == 4) {
        return "48db8e1b9a99424f987689661e50fd50"
    }
}

function fechaApartirDeHora(hora) {
    const splitted = hora.split(":");
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), splitted[0], splitted[1]);
}