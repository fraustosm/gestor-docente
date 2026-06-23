const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getStudentsByGroup,
    createStudent,
    deleteStudent
} = require('../controllers/studentController');

router.get(
    '/group/:groupId',
    authMiddleware,
    getStudentsByGroup
);

router.post(
    '/group/:groupId',
    authMiddleware,
    createStudent
);

router.delete(
    '/:id',
    authMiddleware,
    deleteStudent
);

module.exports = router;