var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

var AppointmentSchema = new mongoose.Schema({
    date: Date,
    startTime: String,
    customer: String,
    location: String,
    counselor:String
})

AppointmentSchema.plugin(mongoosePaginate)
const Appointment = mongoose.model('Appointment', AppointmentSchema)

module.exports = Appointment;