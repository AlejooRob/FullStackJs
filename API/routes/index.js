const express = require('express');
const router = express.Router();
const patientController = require('../controllers/patientControllers');

module.exports = function() {

    //Agregar pacientes via post
    router.post('/pacientes',
        patientController.newClient
    );

    //Obtiene todos los registros de pacientes en la BD
    router.get('/pacientes',
        patientController.getPatients
    );

    //Obtienes tun paciente en especifico (ID)
    router.get('/pacientes/:id',
        patientController.getPatient
    );

    //Actualizar un registro con un ID especifico
    router.put('/pacientes/:id',
        patientController.updatePatient
    )

    //elimina un paciente por su id
    router.delete('/pacientes/:id',
        patientController.deletePatient
    );

    return router;
}