import { Fragment } from "react/jsx-runtime";
import { Link, useParams } from "react-router-dom";

import EntryDetails from "./EntryDetails";
import PatientPageForm from "./PatientPageForm";

import { Diagnosis, Patient } from "../../types";
import { Dispatch, SetStateAction, useState } from "react";
import { Button } from "@mui/material";

interface PatientPageProps {
  patients: Patient[];
  updatePatients: Dispatch<SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[]
};

const PatientPage = ({ patients, updatePatients, diagnoses }: PatientPageProps) => {
  const [openForm, setOpenForm] = useState(false);

  const id = useParams().id;
  const patient = patients.find(p => p.id === id);
  const patientDiagnoses = patient?.entries.map(entry => entry.diagnosisCodes?.map(code => code)).flat();

  const diagnosesWithDescriptions = patientDiagnoses?.reduce((obj, code) => {
    const fetchedDiagnosis: Diagnosis | undefined = diagnoses.find(d => d.code === code);

    if (typeof code === "string" && fetchedDiagnosis?.name) {
      obj[code] = fetchedDiagnosis?.name;
    }

    return obj;
  }, {} as Record<string, string>);

  if (!patient) {
    return (
      <>
        <p>Patient not found.</p>
        <Link to='/'>Go back</Link>
      </>
    );
  }

  return (
    <div>
      <h2>{patient.name}</h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <div>date of birth: {patient.dateOfBirth}</div>
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
      {patient.entries.length > 0 ? patient.entries?.map(entry => (
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