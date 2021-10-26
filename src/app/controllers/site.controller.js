// Models
const CustomerManagement = require('../models/customer.model');
const News = require('../models/new.model');
const SymptomManagement = require('../models/symptom.model');

// Utils
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongo } = require('mongoose');

module.exports = {
    index: function(req, res) {
        Promise.all([SymptomManagement.find({}), News.find({})])
            .then(([symptom, news]) => 
                res.render('home', {
                    symptom: multipleMongooseToObject(symptom),
                    news: multipleMongooseToObject(news)
                })
            )
    },

    newsDetail: function(req, res) {
        Promise.all([News.find({}), News.findOne({slug: req.params.slug})])
            .then(([news, newsDetail]) => 
                res.render('news/news-detail', {
                    news: multipleMongooseToObject(news),
                    newsDetail: mongooseToObject(newsDetail)
                })
            )
    },

    symptomChecker: function(req, res) {
        // BusSchedule.findOne({startpoint: req.query.startpoint, endpoint: req.query.endpoint, tripdate: req.query.tripdate})
        // .populate('cartype')
        // .then(function(busSchedule) {
        //     if(busSchedule) {
        //         res.render('booking/schedule', {
        //             busSchedule: mongooseToObject(busSchedule),
        //             car: mongooseToObject(busSchedule.cartype),
        //         })
        //     }
        //     else {
        //         res.render('booking/schedule', {
        //             busSchedule: mongooseToObject(busSchedule)
        //         })
        //     }
        // })
        const customer = new CustomerManagement(req.body);
        customer.save()
            .then(function(patient) {
                SymptomManagement.findOne({name: req.body.symptom}) 
                    .then(function(symptom) {
                        res.render('booking/schedule', {
                            symptom: mongooseToObject(symptom),
                            patient: mongooseToObject(patient)
                        })
                        console.log(symptom)
                    })   
            }) 
    },

    bookingInfo: function(req, res) {
        res.render('booking/info');
    }
}