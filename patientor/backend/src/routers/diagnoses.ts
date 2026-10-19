import express from 'express';
import { diagnoses } from '../../data/diagnoses.ts';
const router = express.Router();

router.post('/', (_req, _res) => {
    console.log('POST /api/diagnoses');
});

router.get('/', (_req, res) => {
    res.json(diagnoses);
});

router.get('/:code', (req, res) => {
    const code = req.params.code;

    const diagnosis = diagnoses.find(p => p.code.toLowerCase() === code);

    if (!diagnosis) {
        res.status(404).send(`Diagnosis with code ${code} not found`);
    }

    res.json(diagnosis);
})

export default router;