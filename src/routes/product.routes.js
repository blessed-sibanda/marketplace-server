const { Router } = require('express');
const productCtrl = require('../controllers/product.controller');
const { requireAuth, isSeller } = require('../middlewares/auth.middleware');
const { productById } = require('../middlewares/product.middleware');
const { shopById, isShopOwner } = require('../middlewares/shop.middleware');

const router = Router();

router.param('shopId', shopById);
router.param('productId', productById);

router.get('/latest', productCtrl.listLatest);

router.post('/:shopId', requireAuth, isSeller, isShopOwner, productCtrl.create);
router.get('/:shopId', productCtrl.listByShop);
router.get('/related/:productId', productCtrl.relatedProducts);

module.exports = router;
