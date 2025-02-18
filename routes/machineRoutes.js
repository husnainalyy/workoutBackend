const express = require('express');
const router = express.Router();
const machineController = require('../controllers/machineController');
const authenticateUserByClerkId = require('../middlewares/authenticateUserByClerkId');

router.use(authenticateUserByClerkId);

router.post('/', machineController.createMachine);
router.get('/', machineController.getUserMachines);
router.put('/:id', machineController.updateMachine);
router.delete('/:id', machineController.deleteMachine);

module.exports = router;