const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema (
    {
        cartype: {type: String, trim: true, required: true},
        licsenceplates: {type: String, trim: true, required: true, unique: true},  
        carowner: {type: String, trim: true, required: true},     
        busschedule: [{
            type: Schema.Types.ObjectId,
            ref: 'BusSchedule'
        }]
    },
    {
        timestamps: true,
    }
) 

module.exports = mongoose.model('Car', carSchema);