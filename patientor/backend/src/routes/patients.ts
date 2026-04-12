import express, { type Request, type Response} from 'express';
import patientsService from '../services/patientsService.ts';
import { newPatientParser, newEntryParser } from '../middleware.ts';
import type { Entry, NewEntry, NewPatient, Patient } from '../types.ts';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getNonSensitivePatients();
  return res.json(patients);
});

router.get('/:id', (req, res) => {
  try {
    const patient = patientsService.getPatient(req.params.id);
    console.log(patient);
    
    return res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(404).send(errorMessage);
  }
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const newPatient = patientsService.addPatient(req.body);
  return res.json(newPatient);
});

router.post('/:id/entries', newEntryParser, (req: Request<{id: string}, unknown, NewEntry>, res: Response<Entry | string>) => {
  try {
    const entry = req.body;
    const patient = patientsService.addEntry(req.params.id, entry);
    return res.json(patient);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    return res.status(404).send(errorMessage);
  }
});

export default router;