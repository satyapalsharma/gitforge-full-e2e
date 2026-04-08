import { Request, Response } from 'express';
import { generateLineChart } from '../services/chartGenerator';

export async function getLineChart(req: Request, res: Response): Promise<void> {
  try {
    const labelsParam = req.query.labels as string | undefined;
    const dataParam = req.query.data as string | undefined;

    if (!labelsParam || !dataParam) {
      res.status(400).json({ error: 'Missing "labels" or "data" query parameters' });
      return;
    }

    const labels = labelsParam.split(',').map((l) => l.trim());
    const data = dataParam.split(',').map((d) => {
      const num = Number(d.trim());
      if (isNaN(num)) throw new Error(`Invalid number: ${d}`);
      return num;
    });

    if (labels.length !== data.length) {
      res.status(400).json({ error: 'Labels and data arrays must have same length' });
      return;
    }

    const buffer = await generateLineChart(labels, data);
    res.setHeader('Content-Type', 'image/png');
    res.send(buffer);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
