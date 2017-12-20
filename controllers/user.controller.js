// Accessing the Service that we just created

var UserService = require('../services/user.service')

// Saving the context of this module inside the _the variable

_this = this


// Async Controller function to get the User List

exports.getUsers = async function(req, res, next){

    // Check the existence of the query parameters, If the exists doesn't exists assign a default value
    
    var page = req.query.page ? req.query.page : 1
    var limit = req.query.limit ? req.query.limit : 10; 

    try{
    
        var users = await UserService.getUsers({}, page, limit)
        
        // Return the users list with the appropriate HTTP Status Code and Message.
        
        return res.status(200).json({status: 200, data: users, message: "Succesfully Users Recieved"});
        
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: e.message});
        
    }
}

exports.createUser = async function(req, res, next){

    // Req.Body contains the form submit values.

    var user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        username: req.body.username,
        role: req.body.role,
        password: req.body.password
    }

    try{
        
        // Calling the Service function with the new object from the Request Body
    console.log('user from server--'+user);
        var createdUser = await UserService.createUser(user)
        return res.status(201).json({status: 201, data: createdUser, message: "Succesfully Created User"})
    }catch(e){
        
        //Return an Error Response Message with Code and the Error Message.
        
        return res.status(400).json({status: 400, message: "User Creation was Unsuccesfull"})
    }
}

exports.updateUser = async function(req, res, next){

    // Id is necessary for the update

    if(!req.body._id){
        return res.status(400).json({status: 400., message: "Id must be present"})
    }

    var id = req.body._id;

    console.log(req.body)

    var user = {
        id,
        firstname: req.body.firstname ? req.body.firstname : null,
        lastname: req.body.lastname ? req.body.lastname : null,
        email: req.body.email ? req.body.email : null,
        username: req.body.username ? req.body.username : null,
        role: req.body.role ? req.body.role : null
    }

    try{
        var updatedUser = await UserService.updateUser(user)
        return res.status(200).json({status: 200, data: updatedUser, message: "Succesfully Updated User"})
    }catch(e){
        return res.status(400).json({status: 400., message: e.message})
    }
}

exports.removeUser = async function(req, res, next){

    var id = req.params.id;

    try{
        var deleted = await UserService.deleteUser(id)
        return res.status(204).json({status:204, message: "Succesfully User Deleted"})
    }catch(e){
        return res.status(400).json({status: 400, message: e.message})
    }

}

exports.findUserByUsername = async function(req, res, next){
    
        var username = req.params.username;
    
        try{
            var deleted = await UserService.findUserByUserName(username);
            return res.status(204).json({status:204, message: "Succesfully User Deleted"})
        }catch(e){
            return res.status(400).json({status: 400, message: e.message})
        }
    
    }

