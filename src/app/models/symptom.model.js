const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
const Schema = mongoose.Schema;

const symptomSchema = new Schema(
    {
    name: {type: String},
    description: {type: String},
    treatment1: {type: String},
    treatment2: {type: String},
    treatment3: {type: String},
    },
    {
        timestamps: true,
    }
)

// Add plugins
symptomSchema.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all',
});

module.exports = mongoose.model('Symptom', symptomSchema);