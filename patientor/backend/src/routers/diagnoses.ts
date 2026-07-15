import express from 'express';

const router = express.Router();

router.post('/', (req, res) => {
    console.log('POST /api/diagnoses');
});

router.get('/', (_req, res) => {
    console.log('GET /api/diagnoses');
});

export default router;