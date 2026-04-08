import { Router } from 'express';
import { getLineChart } from '../controllers/chartController';

const router = Router();

router.get('/line', getLineChart);

export default router;
