const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/signup', expenseController.postDetails);


module.exports = router;
