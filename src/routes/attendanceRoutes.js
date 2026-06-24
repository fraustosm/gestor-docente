const express = require('express');

const router = express.Router();

const authMiddleware =
    require('../middleware/authMiddleware');

const {
    registerAttendance,
    getAttendanceByStudent,
    attendanceReport
} = require('../controllers/attendanceController');

router.post(
    '/student/:studentId',
    authMiddleware,
    registerAttendance
);

router.get(
    '/student/:studentId',
    authMiddleware,
    getAttendanceByStudent
);

router.get(
    '/report/:studentId',
    authMiddleware,
    attendanceReport
);

module.exports = router;