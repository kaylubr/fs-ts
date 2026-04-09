import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { exerciseCalculator } from './exerciseCalculator.ts';
import { allNumber, isNotNumber } from './utils/helper.ts';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNotNumber(req.query.height) || isNotNumber(req.query.weight))
    return res.status(400).json({ error: 'malformatted parameters' });

  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  const bmi = calculateBmi(height, weight);

  return res.json({ height, weight, bmi });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;
  
  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  };

  if (!allNumber(daily_exercises) || isNaN(Number(target))) {
    return res.status(400).json({ error: 'malformatted parameters' });
  };

  const result = exerciseCalculator(
    daily_exercises as number[], Number(target)
  );

  return res.json(result);
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server listening to PORT: ${PORT}`);
});