import express from 'express';
import methodOverride from 'method-override';
import path from 'path';
import itemsRouter from './routes/items';

const app = express();
const PORT = 3000;

// view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method')); // enables _method query parameter for PUT/DELETE from forms
app.use(express.static(path.join(__dirname, '..', 'public')));

// routes
app.use('/items', itemsRouter);

// redirect root to /items
app.get('/', (_req, res) => {
  res.redirect('/items');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
