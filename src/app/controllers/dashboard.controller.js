// Models
const User = require('../models/user.model');
const NewsMangentment = require('../models/new.model');
const CategoryManagement = require('../models/category.model');
const CustomerManagement = require('../models/customer.model');
const SymptomManagement = require('../models/symptom.model');
const MessageManagement = require('../models/chat.model');


// Utils
const { mongooseToObject } = require('../../util/mongoose');
const { multipleMongooseToObject } = require('../../util/mongoose');
const { mongo } = require('mongoose');
const io = require('socket.io');

module.exports = {
    // [GET] /dashboard/index
    index: function(req, res) {
        Promise.all([CustomerManagement.countDocuments(), User.findOne({})])
            .then(([customersDoc, user]) =>
                res.render('dashboard/index', {
                    customersDoc,
                    user: mongooseToObject(user)
                })
            )          
    },

    // [GET] /dashboard/news/create
    newsCreate: function(req, res) {
        Promise.all([User.findOne({}), CategoryManagement.find({})])
            .then(([user, category]) =>
                res.render('dashboard/news-management/news-create', {
                    user: mongooseToObject(user),
                    category: multipleMongooseToObject(category)
                })
            )
            .catch()
    },

    // [POST] /dashboard/news/store
    newsStore: function(req, res) {
        const newMangentment = new NewsMangentment(req.body);
        newMangentment.save(function() {
            res.redirect('/dashboard/news');
        })
    },

    // [GET] /dashboard/news
    news: function(req, res, next) {
        Promise.all([NewsMangentment.find({}), User.findOne({})])
            .then(([news, user]) =>
                res.render('dashboard/news-management/news', {
                    news: multipleMongooseToObject(news),
                    user: mongooseToObject(user)
                })
            )
            .catch()
    },

    // [GET] /dashboard/news/:id/edit
    newsEdit: function(req, res) {
        Promise.all([NewsMangentment.findById(req.params.id), User.findOne({}), CategoryManagement.find({})])
            .then(([news, user, category]) =>
                res.render('dashboard/news-management/news-edit', {
                    news: mongooseToObject(news),
                    user: mongooseToObject(user),
                    category: multipleMongooseToObject(category),
                })    
            )
    },

    // [DELETE] /dashboard/news/:id/force
    newsForce: function(req, res) {
        NewsMangentment.deleteOne({ _id: req.params.id }, req.body, function() {
            res.redirect('back')
        })
    },

    // [PUT] /dashboard/news-management/:id
    newsUpdate: function(req, res) {
        NewsMangentment.updateOne({_id: req.params.id}, req.body, function() {
            res.redirect('/dashboard/news')
        })
    },

    // [GET] /dashboard/category/create
    categoryCreate: function(req, res) {
        User.findOne({}, function(error, user) {
            res.render('dashboard/category-management/category-create', {
                user: mongooseToObject(user)
            })
        })
    }, 

    // [POST] /dashboard/category/store
    categoryStore: function(req, res) {
        const category = new CategoryManagement(req.body);
        category.save(function() {
            res.redirect('/dashboard/category')
        })
    },

    // [GET] /dashboard/category
    category: function(req, res) {
        Promise.all([User.findOne({}), CategoryManagement.find({})])
            .then(([user, category]) =>
                res.render('dashboard/category-management/category', {
                    user: mongooseToObject(user),
                    category: multipleMongooseToObject(category)
                })
            )
    },

    // [GET] /dashboard/category/:id/edit
    categoryEdit: function(req, res) {
        Promise.all([User.findOne({}), CategoryManagement.findById(req.params.id)])
            .then(([user, category]) =>
                res.render('dashboard/category-management/category-edit', {
                    user: mongooseToObject(user),
                    category: mongooseToObject(category),
                })    
            )
    },

    // [PUT] /dashboard/category-management/:id
    categoryUpdate: function(req, res) {
        CategoryManagement.updateOne({_id: req.params.id}, req.body, function() {
            res.redirect('/dashboard/category')
        })
    },

    // [DELETE] /dashboard/category/:id/force
    categoryForce: function(req, res) {
        CategoryManagement.deleteOne({ _id: req.params.id }, req.body, function() {
            res.redirect('back')
        })
    },

    // [GET] /dashboard/profile/:id/detail
    profile: function(req ,res) {
        User.findById(req.params.id, function(error, user) {
            res.render('dashboard/profile/profile', {
                user: mongooseToObject(user)
            })
        })
    },

    // [PUT] /dashboard/profile/:id
    profileUpdate: function(req, res) {
        User.updateOne({_id: req.params.id}, req.body, function() {
            res.redirect('back');
        })
    },

    // [GET] /dashboard/customers
    customer: function(req, res, next) {
        Promise.all([CustomerManagement.find({}), User.findOne({})])
            .then(([customer, user]) => 
                res.render('dashboard/customer-management/customer', {
                    user: mongooseToObject(user),
                    customer: multipleMongooseToObject(customer),
                })
            )
            .catch()
    },

   // [GET] /dashboard/customers/create
   customerCreate: function(req, res) {
       Promise.all([User.findOne({}), SymptomManagement.find({})])
        .then(([user, listSymptoms]) => 
            res.render('dashboard/customer-management/customer-create', {
                user: mongooseToObject(user),
                listSymptoms: multipleMongooseToObject(listSymptoms),
            })
        )
   },

    // [POST] /dashboard/customers/store
    customerStore: function(req, res) {
        const customer = new CustomerManagement(req.body);
        customer.save(function() {
            res.redirect('/dashboard/customers')
        })  
    },

    // [GET] /dashboard/customers/:id/detail
    customerDetail: function(req, res) {
        Promise.all([CustomerManagement.findById(req.params.id), User.findOne({})])
            .then(([customer, user]) => 
                res.render('dashboard/customer-management/customer-detail', {
                    customer: mongooseToObject(customer),
                    user: mongooseToObject(user),
                })
            )
    },

    // [DELETE] /dashboard/customer/:id/force
    customerForce: function(req, res) {
        CustomerManagement.deleteOne({ _id: req.params.id }, req.body, function() {
            res.redirect('back')
        })
    },

    // [GET] /dashboard/symptom/create
    symptomCreate: function(req, res) {
        Promise.all([User.findOne({})])
            .then(([user]) =>
                res.render('dashboard/symptom-management/symptom-create', {
                    user: mongooseToObject(user),
                })
            )
            .catch()
    },

    // [POST] /dashboard/symptom/store
    symptomStore: function(req, res) {
        const newMangentment = new SymptomManagement(req.body);
        newMangentment.save(function() {
            res.redirect('/dashboard/symptom');
        })
    },

    // [GET] /dashboard/symptom
    symptom: function(req, res, next) {
        Promise.all([SymptomManagement.find({}), User.findOne({})])
            .then(([symptom, user]) =>
                res.render('dashboard/symptom-management/symptom', {
                    symptom: multipleMongooseToObject(symptom),
                    user: mongooseToObject(user)
                })
            )
            .catch()
    },

    // [GET] /dashboard/symptom/:id/edit
    symptomEdit: function(req, res) {
        Promise.all([SymptomManagement.findById(req.params.id), User.findOne({})])
            .then(([symptom, user]) =>
                res.render('dashboard/symptom-management/symptom-edit', {
                    symptom: mongooseToObject(symptom),
                    user: mongooseToObject(user),
                })    
            )
    },

    // [DELETE] /dashboard/symptom/:id/force
    symptomForce: function(req, res) {
        SymptomManagement.deleteOne({ _id: req.params.id }, req.body, function() {
            res.redirect('back')
        })
    },

    // [PUT] /dashboard/symptom/:id
    symptomUpdate: function(req, res) {
        SymptomManagement.updateOne({_id: req.params.id}, req.body, function() {
            res.redirect('/dashboard/symptom')
        })
    },

    // [GET]
    messageIndex: function(req, res) {
        Promise.all([User.findOne({})])
            .then(([user]) =>
                res.render('dashboard/message-management/message', {
                    user: mongooseToObject(user),
                })
            )
            .catch()
    },

    // [POST] /dashboard/message/store
    messageStore: function(req, res) {
        const chatManagement = new MessageManagement(req.body);
        chatManagement.save(function(err) {
            if(err)
                sendStatus(500);
                io.emit('message', req.body);
            res.sendStatus(200);
        })
    },
}   