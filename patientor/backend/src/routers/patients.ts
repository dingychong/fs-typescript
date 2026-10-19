import patients from '../../data/patients.ts';
import type { Patient, NonSensitivePatient, Entry } from '../types.ts';
import express, { type Response } from 'express';
import { newPatientEntrySchema, newEntrySchema} from '../types.ts';
import z from 'zod';
const router = express.Router();

router.post('/', (req, res) => {
    try {
        const newPatientEntry = newPatientEntrySchema.parse(req.body);
        const id = crypto.randomUUID();
        const entries: Patient['entries'] = [];
        const newPatient = { id, entries, ...newPatientEntry};
        patients.push(newPatient);
        res.status(200).json(newPatient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            res.status(400).send( { error: error.issues });
        } else {
            res.status(400).send({ error: 'unknown error' });
        }
    }
});

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    const patientsWithoutSensitiveInfo = patients.map(({ id, name, occupation, gender, dateOfBirth, entries }) => ({
        id,
        name,
        occupation,
        gender,
        dateOfBirth,
        entries,
    }));
    res.json(patientsWithoutSensitiveInfo);
});

router.get('/:id', (req, res) => {
    const patient = patients.find(p => p.id === req.params.id);
    if (patient) {
        res.json(patient);
    } else {
        res.status(404).send({ error: 'Patient not found' });
    }
});

router.post('/:id/entries', (req, res) => {
    const patient = patients.find(p => p.id === req.params.id);
    if (!patient) {
        return res.status(404).send({ error: 'Patient not found' });
    }
    try {
        const entry = newEntrySchema.parse(req.body);
        const id = crypto.randomUUID();
        const newEntry: Entry = { id, ...entry};
        patient.entries.push(newEntry);
        return res.status(200).json(patient);
    } catch (error: unknown) {
        if (error instanceof z.ZodError) {
            return res.status(400).send( { error: error.issues });
        } else {
            return res.status(400).send({ error: 'unknown error' });
        }
    }
});


export default router;