import express from 'express';
import { addColors, editColors, getColors } from '../controllers/colors_ctrl.js';


const router = express.Router();


router.get('/', getColors);
router.post('/add-colors', addColors);
router.put('/edit-colors', editColors);



export default router;