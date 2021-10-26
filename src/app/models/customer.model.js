const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {        
        fullname: {type: String, required: true},
        age: {type: String, required: true},
        phone: {type: String, require: true},
        symptom: {type: String, require: true},
        gender: {type: String, require: true},
        note: {type: String}
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Customer', customerSchema);
