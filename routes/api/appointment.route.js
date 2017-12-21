var express = require('express')

var router = express.Router()

// Getting the User Controller that we just created

var AppointmentController = require('../../controllers/appointment.controller');


// Map each API to the Controller FUnctions

router.get('/', AppointmentController.getAppointment)

router.post('/', AppointmentController.createAppointment)

router.put('/', AppointmentController.updateAppointment)

router.delete('/:id',AppointmentController.removeAppointment)


// Export the Router

module.exports = router;