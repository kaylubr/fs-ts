import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';

const getPatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry
  };

  return newPatient;
};

export default {
  getPatients,
  addPatient,
};