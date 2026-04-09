import express from 'express';
import cors from 'cors';
import diagnosisRouter from './routes/diagnosis.ts';
import patientsRouter from './routes/patients.ts';
import { errorMiddleware } from './middleware.ts';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/ping', (_req, res) => {
    return res.send('pong');
});

app.use('/api/diagnoses', diagnosisRouter);
app.use('/api/patients', patientsRouter);

app.use(errorMiddleware);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server listening to PORT: ${PORT}`);
});