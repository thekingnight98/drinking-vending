const express = require('express');
const machineRoute = express.Router();

// Machine model
let MachineModel = require('../models/Machine');

// Get all data
machineRoute.route('/').get((req, res, next) => {
    MachineModel.find((error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

// Create Machine data
machineRoute.route('/create-machine').post((req, res, next) => {
    MachineModel.create(req.body, (error, data) => {
        if (error) {
            return next(error)
        }
        else {
            res.json(data)
        }
    })
})

// Edit machine data
machineRoute.route('/edit-machine/:id').get((req , res , next)=> {
    MachineModel.findById(req.params.id , (error , data)=>{
        if (error) {
            next(error)
        }
        else {
            res.json(data)
        }
    })
})

// Update machine data
machineRoute.route('/update-machine/:id').put((req , res , next)=> {
    MachineModel.findByIdAndUpdate(req.params.id , {
        $set : req.body
    } , (error , data)=> {
        if (error) {
            next(error)
        }
        else {
            res.json(data)
            console.log('Machine successfully updated');
        }
    })
})

// Delete machine data 
machineRoute.route('/delete-machine/:id').delete((req , res , next)=> [
    MachineModel.findByIdAndUpdate(req.params.id , (error , data)=> {
        if (error) {
            next(error)
        }
        else {
           res.status(200).json({
               nsg : data
           })
        }
    })
])

module.exports = machineRoute;