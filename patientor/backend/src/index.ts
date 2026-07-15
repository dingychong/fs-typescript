import express from 'express';
import cors from 'cors';
import patientRoutes from './routers/patients.ts';
import diagnosisRoutes from './routers/diagnoses.ts';

const app = express();
app.use(cors());
app.use(express.json());


const PORT = 3001;

app.use('/api/patients', patientRoutes);
app.use('/api/diagnoses', diagnosisRoutes);

app.get('/', (_req, res) => {
  res.send('Hello, World!');
});

app.post('/data', (_req, res) => {
    res.send('Data received');
});



app.get('/api/ping', (_req, res) => {
    res.send('pong');
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});