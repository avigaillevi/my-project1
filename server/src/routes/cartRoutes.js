import Router from 'express';
import ctrl from '../controllers/cartCtrl.js';
const router = Router();

router.get('/', ctrl.getAll);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);  
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);
router.put('/add/:id', ctrl.addToCart);
export default router;