const experiencias = require('./experiencias');
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

function fechaApartirDeHora(hora) {
    const splitted = hora.split(":");
    const now = new Date();
    console.log(hora);
    return new Date(now.getFullYear(), now.getMonth(), now.getDate(), splitted[0], splitted[1]);
}