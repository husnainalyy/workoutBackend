const express = require('express');
const router = express.Router();
const variationController = require('../controllers/variationController');
const authenticateUserByClerkId = require('../middlewares/authenticateUserByClerkId');

router.use(authenticateUserByClerkId);

router.post('/', variationController.createVariation);
router.get('/', variationController.getUserVariations);
router.put('/:id', variationController.updateVariation);
router.delete('/:id', variationController.deleteVariation);

module.exports = router;