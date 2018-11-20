const assert = require('assert');
const moment = require('moment');
const experiencias = require('./index');

describe('Modulo experiencias', function() {
    it('debe retornar la experiencia dentro del horario', function() {
        const experiencia1 = experiencias.obtenerExperienciaSegunHoraDeInicio(new Date());
        assert.equal(experiencia1.id, 2);
    });
});