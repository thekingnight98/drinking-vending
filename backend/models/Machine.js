const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let machineSchema = new Schema({
    name : {
        type : String
    },
    location : {
        type : String
    },
    countStock : {
        type : Number
    },
    balance  : {
        type : Number
    },
    usercount : {
        type : Number
    }
} , {
    collection : 'machines'
})

module.exports = mongoose.model('Machine' , machineSchema);