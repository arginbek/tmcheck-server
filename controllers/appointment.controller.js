// Accessing the Service that we just created

var AppointmentService = require('../services/appointment.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the User List

exports.getAppointment = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var appointments = await AppointmentService.getAppointments({}, page, limit)
        
        // Return the appointment list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: appointments, message: "Succesfully Appointments Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getUserAppointment = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var appointments = await AppointmentService.getAppointments({customer: req.params.username}, page, limit)
        
        // Return the appointment list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: appointments, message: "Succesfully Appointments Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.getFreeAppointments = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var appointments = await AppointmentService.getAppointments({$or: [{customer: null}, {customer: ''}]}, page, limit)
        
        // Return the appointment list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: appointments, message: "Succesfully Appointments Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createAppointment = async function(req, res, next){

    // Req.Body contains the form submit values.

     
    var appointment = {
        date: req.body.date,
        startTime: req.body.startTime,
        customer: req.body.customer,
        location: req.body.location,
        counselor: req.body.counselor
    };
    try{
        
        // Calling the Service function with the new object from the Request Body
    
        var createdAppointment = await AppointmentService.createAppointment(appointment)
        return res.status(201).json({status: 201, data: createdAppointment, message: "Succesfully Created Appointment"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "Appointment Creation was Unsuccesfull"})
    }
}

exports.updateAppointment = async function(req, res, next){
    // Id is necessary for the update
    console.log(req.body._id);
    console.log('I want to update');
    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)
 
    var appointment = {
        id,
        date: req.body.date ? req.body.date:null,
        startTime: req.body.startTime ? req.body.startTime:null, 
        customer: req.body.customer ?  req.body.customer:null,
        location: req.body.location ? req.body.location:null,
        counselor:req.body.counselor ? req.body.counselor:null
    };
    try{
        var updatedAppointment = await AppointmentService.updateAppointment(appointment)
        return res.status(200).json({status: 200, data: updatedAppointment, message: "Succesfully Updated Appointment"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeAppointment = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await AppointmentService.deleteAppointment(id)
        return res.status(204).json({status:204, message: "Succesfully Appointment Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

