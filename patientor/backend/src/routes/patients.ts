import express, { type Request, type Response} from 'express';
import patientsService from '../services/patientsService.ts';
import { newPatientParser } from '../middleware.ts';
import type { NewPatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getPatients();
  return res.json(patients);
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = patientsService.addPatient(req.body);
  return res.json(newPatient);
});

export default router;