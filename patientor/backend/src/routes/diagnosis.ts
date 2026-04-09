import express from 'express';
import diagnosisService from '../services/diagnosisService.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const diagnoses = diagnosisService.getDiagnoses();
  return res.json(diagnoses);
});

export default router;