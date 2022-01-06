const { Router } = require('express');
const shopCtrl = require('../controllers/shop.controller');
const { shopById } = require('../middlewares/shop.middleware');
const { requireAuth, isSeller } = require('../services/auth.service');

const router = Router();

router.param('shopId', shopById);
router.post('/', requireAuth, isSeller, shopCtrl.create);
router.get('/user/:userId', requireAuth, shopCtrl.listByOwner);
router.get('/', shopCtrl.list);
router.get('/:shopId', shopCtrl.read);

module.exports = router;
