const experiencias = require('./experiences');
const moment = require('moment');


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
    //return experiencias["1"];
    var date = new Date();
    var now = "" + date.getUTCHours() + date.getUTCMinutes();
    var nowInt = parseInt(now, 10);
    if (300 <= nowInt && nowInt <= 859) {
        return experiencias["1"];
        console.log("estamos en exp 1");
    } else if (900 <= nowInt && nowInt <= 1459) {
        console.log("estamos en exp 2");
        return experiencias["2"];
    } else if (1500 <= nowInt && nowInt <= 2059) {
        console.log("esta funcando la experiencia 3")
        return experiencias["3"];
    } else if (2100 <= nowInt && nowInt <= 2359) {
        console.log("estamos en exp 4");
        return experiencias["4"];
    } else if (0 <= nowInt && nowInt <= 259) {
        console.log("estamos en exp 4");
        return experiencias["4"];
    }







}

exports.getStoryFromStoryId = function(storyId) {
    return experiencias[storyId];
}

function fechaApartirDeHora(hora) {
    const splitted = hora.split(":");
    const now = new Date();
    console.log(hora);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), splitted[0], splitted[1]);
}