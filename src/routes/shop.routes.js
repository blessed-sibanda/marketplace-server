const { Router } = require('express');
const shopCtrl = require('../controllers/shop.controller');
const { requireAuth, isSeller } = require('../services/auth.service');

const router = Router();

router.post('/', requireAuth, isSeller, shopCtrl.create);
router.get('/user/:userId', requireAuth, shopCtrl.listByOwner);

module.exports = router;
