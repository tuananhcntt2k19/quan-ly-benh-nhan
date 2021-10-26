const express = require('express');
const router = express.Router();

// Site Controller
const siteController = require('../app/controllers/site.controller');

router.get('/', siteController.index);
router.get('/news/:slug', siteController.newsDetail);
router.post('/symptom-checker', siteController.symptomChecker);
router.get('/info', siteController.bookingInfo);


module.exports = router;