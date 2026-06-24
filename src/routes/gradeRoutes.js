const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    createGrade,
    getGradesByStudent,
    gradeReport
} = require('../controllers/gradeController');

router.post(
    '/',
    authMiddleware,
    createGrade
);

router.get(
    '/student/:studentId',
    authMiddleware,
    getGradesByStudent
);

router.get(
    '/report/:studentId',
    authMiddleware,
    gradeReport
);

module.exports = router;