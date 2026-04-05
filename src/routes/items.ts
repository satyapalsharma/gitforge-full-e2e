import { Router, Request, Response } from 'express';
import { Item, ItemInput } from '../models/item';

const router = Router();

// In-memory store
let items: Item[] = [];
let nextId = 1;

// GET /items – list all items
router.get('/', (_req: Request, res: Response) => {
  res.render('items/index', { items });
});

// GET /items/new – show create form
router.get('/new', (_req: Request, res: Response) => {
  res.render('items/new', { item: { name: '', description: '' } as ItemInput });
});

// POST /items – create new item
router.post('/', (req: Request, res: Response) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Name and description are required.');
  }

  const newItem: Item = {
    id: nextId++,
    name,
    description,
  };
  items.push(newItem);
  res.redirect('/items');
});

// GET /items/:id/edit – show edit form
router.get('/:id/edit', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).send('Item not found.');
  }
  res.render('items/edit', { item });
});

// PUT /items/:id – update an item (use _method=PUT in form)
router.put('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((i) => i.id === id);
  if (!item) {
    return res.status(404).send('Item not found.');
  }

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).send('Name and description are required.');
  }

  item.name = name;
  item.description = description;
  res.redirect('/items');
});

// DELETE /items/:id – delete an item (use _method=DELETE in form)
router.delete('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) {
    return res.status(404).send('Item not found.');
  }
  items.splice(index, 1);
  res.redirect('/items');
});

export default router;
