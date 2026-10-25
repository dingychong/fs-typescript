import { Dialog, DialogTitle, DialogContent, Divider, Alert, Select, MenuItem} from '@mui/material';

import { Diagnosis, NewEntry } from "../../types";
import { useEffect, useState } from 'react';

import BaseFieldsForm from './BaseFieldsForm';
import AddHealthCheckEntryForm from './AddHealthCheckEntryForm';
import AddHospitalEntryForm from './AddHospitalEntryForm';
import AddOccupationalHealthcareEntryForm from './AddOccupationalHealthcareEntryForm';

type BaseValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}
type props = {
    onCancel: () => void;
    onSubmit: (values: NewEntry) => void;
    error: string | null;
    setError: (error: string) => void;
    diagnosisDetails: Diagnosis[];
}
const AddEntryForm = ({ onCancel, onSubmit, error, setError, diagnosisDetails }: props) => {
    const [type, setType] = useState<NewEntry['type']>('HealthCheck');
    const [baseFields, setBaseFields] = useState<BaseValues>({
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: []
    });
    useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
    return (
        <div>
            {error && <Alert severity="error">{error}</Alert>}
            <BaseFieldsForm baseFields={baseFields} setBaseFields={setBaseFields} diagnosisDetails={diagnosisDetails} />
            <Select value={type} onChange={(e) => setType(e.target.value as NewEntry['type'])}>
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
                <MenuItem value="OccupationalHealthcare">Occupational Healthcare</MenuItem>
            </Select>

            {type === 'HealthCheck' && (
                <AddHealthCheckEntryForm baseFields={baseFields} onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {type === 'Hospital' && (
                <AddHospitalEntryForm baseFields={baseFields} onSubmit={onSubmit} onCancel={onCancel} />
            )}
            {type === 'OccupationalHealthcare' && (
                <AddOccupationalHealthcareEntryForm baseFields={baseFields} onSubmit={onSubmit} onCancel={onCancel} />
            )}
        </div>
        
    )

};

export default AddEntryForm;
