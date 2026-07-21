import { patients } from '../../data/patients.ts';
import type { NonSensitivePatient } from '../types.ts';
import express, { type Response } from 'express';
import { parseNewPatientEntry } from '../utils.ts';
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const newPatientEntry = parseNewPatientEntry(req.body);
        const id = crypto.randomUUID();
        const newPatient = { id, ...newPatientEntry };
        patients.push(newPatient);
        res.status(201).json(newPatient);
    } catch (error: unknown) {
        res.status(400).send(error instanceof Error ? error.message : "An error occurred");
    }
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    const patientsWithoutSensitiveInfo = patients.map(({ id, name, occupation, gender, dateOfBirth }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
    }));
    res.json(patientsWithoutSensitiveInfo);
});

export default router;