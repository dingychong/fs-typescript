import { patients } from '../../data/patients.ts';
import type { NonSensitivePatient } from '../types.ts';
import express, { type Response } from 'express';
import { newPatientEntrySchema } from '../types.ts';
import z from 'zod';
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const newPatientEntry = newPatientEntrySchema.parse(req.body);
        const id = crypto.randomUUID();
        const newPatient = { id, ...newPatientEntry };
        patients.push(newPatient);
        res.status(201).json(newPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send( { error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
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