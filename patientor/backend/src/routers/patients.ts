import { patients } from '../../data/patients.ts';
import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    const newPatient = req.body;
    const id = crypto.randomUUID();
    newPatient.id = id;
    patients.push(newPatient);
    res.status(201).json(newPatient);
});

router.get('/', (_req, res) => {
    res.json(patients);
});

export default router;