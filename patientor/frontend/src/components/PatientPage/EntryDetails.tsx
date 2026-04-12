import { Entry } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

import utils from "../../utils";

interface EntryDetailsProps {
  entry: Entry;
  diagnosis: Record<string, string> | undefined;
}

const cardStyle = {
  border: 'solid 1px black',
  borderRadius: '6px',
  margin: '1rem 0',
  padding: '1rem'
};

const EntryDetails = ({ entry, diagnosis }: EntryDetailsProps) => {
  switch (entry.type) {
    case 'HealthCheck':
      const RISK_COLORS = ['#4caf50', '#ff9800', '#f44336', '#7b1fa2'];
      return (
        <div key={entry.id} style={cardStyle}>
          <div style={{display: 'flex', alignItems: 'center'}}>{entry.date}&nbsp;<MedicalServicesIcon/></div>
          <i>{entry.description}</i>
          <div>
            <FavoriteIcon sx={{ color: RISK_COLORS[entry.healthCheckRating]}} />
          </div>
          <br />
          <div>Diagnose by {entry.specialist}</div>
          {entry.diagnosisCodes?.map(codes => (
            <ul key={codes}>
              <li>{codes}&nbsp;{diagnosis?.[codes]}</li>
            </ul>
          ))}
        </div>
      );

    case 'OccupationalHealthcare':
      return (
        <div key={entry.id} style={cardStyle}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {entry.date}&nbsp;
            <WorkIcon/>&nbsp;
            {entry.employerName}
          </div>
          <i>{entry.description}</i>
          { 
            entry.sickLeave?.startDate && entry.sickLeave?.endDate && (
              <>
                <br />
                <br />
                <b>Sick leave:</b>
                <div>From: {entry.sickLeave.startDate}</div>
                <div>To: {entry.sickLeave.endDate}</div>
              </>
            )
          }
   
          <br />
          <div>Diagnose by <i>{entry.specialist}</i></div>
          {entry.diagnosisCodes?.map(codes => (
            <ul key={codes}>
              <li>{codes}&nbsp;{diagnosis?.[codes]}</li>
            </ul>
          ))}
        </div>
      );
      case 'Hospital':
        return (
          <div key={entry.id} style={cardStyle}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              {entry.date}&nbsp;
              <LocalHospitalIcon/>&nbsp;
            </div>
            <i>{entry.description}</i>
            <br />
            <br />
            <div>Discharge date:&nbsp;{entry.discharge.date}&nbsp;-&nbsp;{entry.discharge.criteria}</div>
            <br />
            <div>Diagnose by <i>{entry.specialist}</i></div>
            {entry.diagnosisCodes?.map(codes => (
              <ul key={codes}>
                <li>{codes}&nbsp;{diagnosis?.[codes]}</li>
              </ul>
            ))}
          </div>
        );
      default:
        utils.asserNever(entry);
  }
};

export default EntryDetails;