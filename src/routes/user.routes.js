const { Router } = require('express');

const { formatError } = require('../helpers/error.helper');
const { requireAuth, isProfileOwner } = require('../middlewares/auth.middleware');
const { userById } = require('../middlewares/user.middleware');
const User = require('../models/user.model');
const userCtrl = require('../controllers/user.controller');

const router = Router();

router.get('/', userCtrl.list);

router.post('/', userCtrl.create);

router.param('userId', userById);

router.get('/:userId', requireAuth, userCtrl.read);

router.put('/:userId', requireAuth, isProfileOwner, userCtrl.update);

router.delete('/:userId', requireAuth, isProfileOwner, userCtrl.delete);

module.exports = router;
