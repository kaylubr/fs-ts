import { useState, SyntheticEvent, Dispatch, SetStateAction } from "react";
import Paper from "@mui/material/Paper";
import { 
  Typography, 
  TextField, 
  Box, 
  Button, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControl,
  OutlinedInput,
  Chip,
  } from "@mui/material";
import { useParams } from "react-router-dom";
import { z } from "zod";

import patientService from '../../services/patients';
import ErrorNotification from "../ErrorNotificationProps";
import { Diagnosis, NewEntrySchema, Patient } from "../../types";

interface PatientPageFormProps {
  updatePatients: Dispatch<SetStateAction<Patient[]>>;
  diagnoses: Diagnosis[];
  toggleFormView: Dispatch<SetStateAction<boolean>>;
}

const PatientPageForm = ({ updatePatients, diagnoses, toggleFormView }: PatientPageFormProps) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [diagnosisCodes, setCodes] = useState<string[]>([]);
  const [type, setType] = useState('HealthCheck');
  const [error, setError] = useState<string | null>(null);
  
  const [healthCheckRating, setHealthRating] = useState(0);

  const [employerName, setEmployerName] = useState('');
  const [startDate, setSickLeaveStart] = useState('');
  const [endDate, setSickLeaveEnd] = useState('');

  const [dischargeDate, setDischargeDate] = useState('');
  const [criteria, setCriteria] = useState('');

  const userId = useParams().id;

  const clearForm = (): void => {
    setDate('');
    setDescription('');
    setSpecialist('');
    setCodes([]);
    
    setHealthRating(0);
    setEmployerName('');
    setSickLeaveStart('');
    setSickLeaveEnd('');

    setDischargeDate('');
    setCriteria('');
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      const baseEntry = {
        date,
        description,
        specialist,
        diagnosisCodes,
        type
      };

      const newEntry = NewEntrySchema.parse(
      type === 'HealthCheck'
        ? { ...baseEntry, healthCheckRating: Number(healthCheckRating) }
        : type === 'OccupationalHealthcare'
        ? { ...baseEntry, employerName, sickLeave: { startDate, endDate } }
        : { ...baseEntry, discharge: { date: dischargeDate, criteria } }
    );

      await patientService.createEntry(userId, newEntry);
      const updatedPatients = await patientService.getAll();

      updatePatients(updatedPatients);
      clearForm();
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        setError(z.prettifyError(e));
      } else if (e instanceof Error) {
        setError(e.message);
      }
      setTimeout(() => setError(null), 4000);
    }
  };

  return (
    <Paper sx={{ p: 3,  marginTop: 2 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', marginBottom: 2 }}>New Entry Form</Typography>
        { error && <ErrorNotification message={error} /> } 
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <FormControl size="small" fullWidth>
          <InputLabel>Type</InputLabel>
          <Select
            value={type}
            label="Type"
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value="HealthCheck">Health Check</MenuItem>
            <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            <MenuItem value="Hospital">Hospital</MenuItem>
          </Select>
          </FormControl>
          <TextField
            label='Date'
            required
            size="small"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            slotProps={{ inputLabel: { shrink: true } }}
          />
          <TextField
            required
            label="Description"
            size="small"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            required
            label="Specialist"
            size="small"
            value={specialist}
            onChange={(e) => setSpecialist(e.target.value)}
          />

          <FormControl size="small" fullWidth>
          <InputLabel>Diagnosis Codes</InputLabel>
          <Select
            multiple
            label="Diagnosis Codes"
            value={diagnosisCodes}
            onChange={(e) => setCodes(e.target.value as string[])}
            input={<OutlinedInput label="Diagnosis Codes" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((code) => (
                  <Chip key={code} label={code} />
                ))}
              </Box>
            )}
          >
            {diagnoses.map((d) => (
              <MenuItem value={d.code} key={d.code}>
                {d.code}&nbsp;-&nbsp;{d.name}
              </MenuItem>
            ))}
          </Select>
          </FormControl>
          { type === 'HealthCheck' && (
            <FormControl size="small" fullWidth>
            <InputLabel>Health Rating</InputLabel>
            <Select
              required
              label="Health Rating (0-3)"
              value={healthCheckRating}
              onChange={(e) => setHealthRating(e.target.value)}
            >
              <MenuItem value={0}>0 - Healthy</MenuItem>
              <MenuItem value={1}>1- Low Risk</MenuItem>
              <MenuItem value={2}>2 - High Risk</MenuItem>
              <MenuItem value={3}>3 - Critical Risk</MenuItem>
            </Select>
            </FormControl>
          )}

          { type === 'OccupationalHealthcare' && (
            <>
              <TextField
                required
                label="Employer Name"
                size="small"
                value={employerName}
                onChange={(e) => setEmployerName(e.target.value)}
              />
              <fieldset style={{ borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.35)', padding: '1rem' }}>
              <legend style={{ color: 'rgba(0, 0, 0, 0.55)', fontSize: '1rem', paddingInline: 4 }}>
                Sick Leave (Start & End)
              </legend>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="Start Date"
                  type="date"
                  value={startDate}
                  onChange={(e) => setSickLeaveStart(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  size="small"
                  label="End Date"
                  type="date"
                  value={endDate}
                  onChange={(e) => setSickLeaveEnd(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Box>
              </fieldset>
            </>
          )}

          {type === 'Hospital' && (
            <fieldset style={{ borderRadius: 4, borderColor: 'rgba(0, 0, 0, 0.35)', padding: '1rem' }}>
              <legend style={{ color: 'rgba(0, 0, 0, 0.87)', fontSize: '1rem', paddingInline: 4 }}>
                Discharge (Start & End)
              </legend>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  size="small"
                  label="Start Date"
                  type="date"
                  value={dischargeDate}
                  onChange={(e) => setDischargeDate(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
                <TextField
                  size="small"
                  label="End Date"
                  type="date"
                  value={criteria}
                  onChange={(e) => setCriteria(e.target.value)}
                  slotProps={{ inputLabel: { shrink: true } }}
                />
              </Box>
              </fieldset>
          )}
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button type="submit" variant="contained">Add</Button>
            <Button 
              type="button" 
              variant="outlined"
              onClick={() => {
                toggleFormView(false);
                clearForm();
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </Paper >
  );
};

export default PatientPageForm;