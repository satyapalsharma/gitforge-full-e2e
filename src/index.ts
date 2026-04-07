import express from 'express';
import settingsRouter from './routes/settings';

const app = express();
app.use(express.json());

// Mount the settings routes under /api/settings
app.use('/api/settings', settingsRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
