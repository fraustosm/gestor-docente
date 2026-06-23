const express = require('express');

const router = express.Router();

const authMiddleware = require('../middleware/authMiddleware');

const {
    getGroups,
    createGroup,
    updateGroup,
    deleteGroup
} = require('../controllers/groupController');

router.get(
    '/',
    authMiddleware,
    getGroups
);

router.post(
    '/',
    authMiddleware,
    createGroup
);

router.put(
    '/:id',
    authMiddleware,
    updateGroup
);

router.delete(
    '/:id',
    authMiddleware,
    deleteGroup
);

module.exports = router;