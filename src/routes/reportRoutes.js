const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    studentReport
} = require('../controllers/reportController');

router.get(
    '/student/:studentId',
    authMiddleware,
    studentReport
);

module.exports = router;