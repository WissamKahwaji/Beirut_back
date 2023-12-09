import express from 'express';
import { addNavData, editNavBarData, getNavData } from '../controllers/navbar_ctrl.js';



const router = express.Router();

router.get('/', getNavData);
router.post('/add', addNavData);
router.put('/edit/:id', editNavBarData);


export default router;