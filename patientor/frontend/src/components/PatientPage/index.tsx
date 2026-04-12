import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";
import PatientPageForm from "./PatientPageForm";
import { Button } from "@mui/material";
import { Diagnosis, Patient } from "../../types";

import patientService from '../../services/patients';

interface PatientPageProps {
  updatePatients: Dispatch<SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[]
};

const PatientPage = ({ updatePatients, diagnoses }: PatientPageProps) => {
  const [openForm, setOpenForm] = useState(false);
  const [currentPatient, setCurrentPatient] = useState<Patient | null>(null);

  const id = useParams().id;
  if (!id) {
    return <div>Page not found.</div>;
  }

  const fetchPatient = async () => {
    const patient = await patientService.getPatient(id);
    setCurrentPatient(patient);
  };

  fetchPatient();

  const patientDiagnoses = currentPatient?.entries.map(entry => entry.diagnosisCodes?.map(code => code)).flat();

  const diagnosesWithDescriptions = patientDiagnoses?.reduce((obj, code) => {
    const fetchedDiagnosis: Diagnosis | undefined = diagnoses.find(d => d.code === code);

    if (typeof code === "string" && fetchedDiagnosis?.name) {
      obj[code] = fetchedDiagnosis?.name;
    }

    return obj;
  }, {} as Record<string, string>);

  if (!currentPatient) {
    return (
      <>
        <p>Patient not found.</p>
        <Link to='/'>Go back</Link>
      </>
    );
  }

  return (
    <div>
      <h2>{currentPatient.name}</h2>
      <div>ssn: {currentPatient.ssn}</div>
      <div>occupation: {currentPatient.occupation}</div>
      <div>date of birth: {currentPatient.dateOfBirth}</div>
      { !openForm ?
        <Button 
          type="button" 
          variant="contained"
          sx={{ marginTop: '1rem' }}
          onClick={() => setOpenForm(true)}
        >
          Add New Entry
        </Button>
        : <PatientPageForm updatePatients={updatePatients} diagnoses={diagnoses} toggleFormView={setOpenForm} />
      }
      <h3>Entries</h3>
      {currentPatient.entries.length > 0 ? currentPatient.entries?.map(entry => (
        <Fragment key={entry.id}>
          <EntryDetails entry={entry} diagnosis={diagnosesWithDescriptions} />
        </Fragment>
      ))
      : <p>No entries.</p>
      }
    </div>
  );
};

export default PatientPage;