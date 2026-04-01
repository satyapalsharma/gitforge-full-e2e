import { Router } from 'express';
import authRoutes from '../features/authentication';
import dashboardRoutes from '../features/dashboard';
import crudRoutes from '../features/crud';
import searchFilterRoutes from '../features/search-filter';
import responsiveUiRoutes from '../features/responsive-ui';
import notificationsRoutes from '../features/notifications';
import settingsProfileRoutes from '../features/settings-profile';
import dataVisualizationRoutes from '../features/data-visualization';

const router = Router();

router.use('/auth', authRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/crud', crudRoutes);
router.use('/search-filter', searchFilterRoutes);
router.use('/responsive-ui', responsiveUiRoutes);
router.use('/notifications', notificationsRoutes);
router.use('/settings-profile', settingsProfileRoutes);
router.use('/data-visualization', dataVisualizationRoutes);

export default router;
