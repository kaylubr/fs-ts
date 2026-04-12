import { v1 as uuid } from 'uuid';
import patients from '../../data/patients.ts';
import { EntrySchema, type Entry, type NewEntry, type NewPatient, type Patient } from '../types.ts';
import z from 'zod';

const getPatients = (): Patient[] => {
  return patients;
};

const getPatient = (id: string): Patient => {
  const patient = patients.find(person => person.id === id);
  if (!patient) {
    throw new Error(`Cannot find patient with the id: ${id}`);
  }

  return patient;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient = {
    id: uuid(),
    ...entry,
    entries: []
  };

  return newPatient;
};

const addEntry = (id: string, obj: NewEntry): Entry => {
  const patient = patients.find(person => person.id === id);
  if (!patient) {
    throw new Error(`Cannot find patient with the id: ${id}`);
  }

  const newEntry = { id: uuid(), ...obj };

  try {
    const parsedData = EntrySchema.parse(newEntry);
    patient?.entries.push(parsedData);
    return newEntry;
  } catch (e: unknown) {
    if (e instanceof z.ZodError) {
      throw new Error(`Error parsing: ${e.issues[0]?.message}`, { cause: e });
    } else {
      throw new Error(`Something went wrong. Can't add the entry`, { cause: e });
    }
  }
};

export default {
  getPatients,
  getPatient,
  addPatient,
  addEntry,
};