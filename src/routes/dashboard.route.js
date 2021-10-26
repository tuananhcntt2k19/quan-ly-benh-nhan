const express = require('express');
const router = express.Router();

// Dashboard Controller
const dashBoardController = require('../app/controllers/dashboard.controller');

router.get('/', dashBoardController.index);

// News Router
router.get('/news', dashBoardController.news);
router.get('/news/create', dashBoardController.newsCreate);
router.post('/news/store', dashBoardController.newsStore);
router.get('/news/:id/edit', dashBoardController.newsEdit);
router.put('/news/:id', dashBoardController.newsUpdate);
router.delete('/news/:id/force', dashBoardController.newsForce);

// Category Router
router.get('/category', dashBoardController.category);
router.get('/category/create', dashBoardController.categoryCreate);
router.post('/category/store', dashBoardController.categoryStore);
router.get('/category/:id/edit', dashBoardController.categoryEdit);
router.put('/category/:id', dashBoardController.categoryUpdate);
router.delete('/category/:id/force', dashBoardController.categoryForce);

// Profile Router
router.get('/profile/:id/detail', dashBoardController.profile);
router.put('/profile/:id', dashBoardController.profileUpdate);

// Customer Router
router.get('/customers', dashBoardController.customer);
router.get('/customer/create', dashBoardController.customerCreate);
router.post('/customer/store', dashBoardController.customerStore);
router.get('/customer/:id/detail', dashBoardController.customerDetail);
router.delete('/customer/:id/force', dashBoardController.customerForce);

// Symptom Router
router.get('/symptom', dashBoardController.symptom);
router.get('/symptom/create', dashBoardController.symptomCreate);
router.post('/symptom/store', dashBoardController.symptomStore);
router.get('/symptom/:id/edit', dashBoardController.symptomEdit);
router.put('/symptom/:id', dashBoardController.symptomUpdate);
router.delete('/symptom/:id/force', dashBoardController.symptomForce);

// Chat Router
router.get('/chat/', dashBoardController.messageIndex);
//router.post('/message/store', dashBoardController.messageStore);

module.exports = router;