import express from 'express';
import * as controller from '../controllers/rol.controller';

const router = express.Router();

router.post('/create', controller.create);
router.post('/update', controller.update);
router.post('/action', controller.action);
router.get('/all', controller.getAll);
router.post('/one', controller.getOne);
router.get('/label', controller.getLabel);

export default router;