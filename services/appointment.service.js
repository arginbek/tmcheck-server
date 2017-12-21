// Gettign the Newly created Mongoose Model we just created 
var Appointment = require('../models/appointment.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getAppointments = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var appointments = await Appointment.paginate(query, options)

        // Return the appointment list that was returned by the mongoose promise
        return appointments;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Appointment')
    }
}

exports.createAppointment = async function (appointment) {

    // Creating a new Mongoose Object by using the new keyword
    var newAppointment = new Appointment({
        date: appointment.date,
        startTime: appointment.startTime,
        customer: appointment.customer,
        location: appointment.location,
        counselor: appointment.counselor
    })

    try {

        // Saving the User 
        var savedAppointment = await newAppointment.save()

        return savedAppointment;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating Appointment")
    }
}

exports.findAppointmentByAppointmentName = async function (appointment){
    try {
        var appointment = await Appointment.find({appointment: appointment});

        return appointment;
    } catch(e){
        throw Error("Error occured while Finding the User");
    }
}

exports.updateAppointment = async function (appointment) {
    var id = appointment.id

    try {
        //Find the old User Object by the Id

        var oldAppointment = await Appointment.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the Appointment")
    }

    // If no old User Object exists return false
    if (!oldAppointment) {
        return false;
    }

    console.log(oldAppointment)

    //Edit the User Object
    oldAppointment.date = appointment.date,
    oldAppointment.startTime = appointment.startTime,
    oldAppointment.customer = appointment.customer,
    oldAppointment.location=appointment.location,
    oldAppointment.counselor=appointment.counselor


    console.log(oldAppointment)

    try {
        var savedAppointment = await oldAppointment.save()
        return savedAppointment;
    } catch (e) {
        throw Error("And Error occured while updating the Appointment");
    }
}

exports.deleteAppointment = async function (id) {

    // Delete the Appointment
    try {
        var deleted = await Appointment.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("Appointment Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the Appointment")
    }
}