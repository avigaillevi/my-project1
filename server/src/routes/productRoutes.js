import { Router } from 'express';
import ctrl from '../controllers/productCtrl.js';
const router = Router();
 
router.get('/search', ctrl.searchbyText);
router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

 
export default router;