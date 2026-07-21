import express from 'express';

const router = express.Router();

router.post('/', (_req, _res) => {
    console.log('POST /api/diagnoses');
});

router.get('/', (_req, _res) => {
    console.log('GET /api/diagnoses');
});

export default router;