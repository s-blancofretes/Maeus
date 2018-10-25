module.exports = {
    dbCreateNewExperience: async function({ numeroMovil, idExperiencia }) {
        const experiencia = {
            numeroMovil,
            horaComienzo: new Date(),
            secuenciaActual: 0,
            termino: false,
            idExperiencia
        };

        return await db.collection('experiencias').insert(experiencia);
    }
}