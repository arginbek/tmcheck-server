// Gettign the Newly created Mongoose Model we just created 
var User = require('../models/user.model')

// Saving the context of this module inside the _the variable
_this = this

// Async function to get the User List
exports.getUsers = async function (query, page, limit) {

    // Options setup for the mongoose paginate
    var options = {
        page,
        limit
    }

    // Try Catch the awaited promise to handle the error 

    try {
        var users = await User.paginate(query, options)

        // Return the userd list that was retured by the mongoose promise
        return users;

    } catch (e) {

        // return a Error message describing the reason 
        throw Error('Error while Paginating Users')
    }
}

exports.createUser = async function (user) {

    // Creating a new Mongoose Object by using the new keyword
    var newUser = new User({
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        role: user.role
    })

    try {

        // Saving the User 
        var savedUser = await newUser.save()

        return savedUser;
    } catch (e) {

        // return a Error message describing the reason     
        throw Error("Error while Creating User")
    }
}

exports.updateUser = async function (user) {
    var id = user.id

    try {
        //Find the old User Object by the Id

        var oldUser = await User.findById(id);
    } catch (e) {
        throw Error("Error occured while Finding the User")
    }

    // If no old User Object exists return false
    if (!oldUser) {
        return false;
    }

    console.log(oldUser)

    //Edit the User Object
    oldUser.firstname = user.firstname,
    oldUser.lastname = user.lastname,
    oldUser.email = user.email,
    oldUser.username = user.username,
    oldUser.role = user.role


    console.log(oldUser)

    try {
        var savedUser = await oldUser.save()
        return savedUser;
    } catch (e) {
        throw Error("And Error occured while updating the User");
    }
}

exports.deleteUser = async function (id) {

    // Delete the User
    try {
        var deleted = await User.remove({ _id: id })
        if (deleted.result.n === 0) {
            throw Error("User Could not be deleted")
        }
        return deleted
    } catch (e) {
        throw Error("Error Occured while Deleting the User")
    }
}