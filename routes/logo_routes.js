import express from 'express';
import { addLogoData, getLogoData } from '../controllers/logo_ctrl.js';


const router = express.Router();


router.get('/', getLogoData);
router.post('/', addLogoData)




export default router;