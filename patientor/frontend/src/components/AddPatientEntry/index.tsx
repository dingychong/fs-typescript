import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import { NewEntry } from "../../types";
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
const AddEntryForm = ({ onCancel, onSubmit }: { onCancel: () => void; onSubmit: (values: NewEntry) => void }) => {
    const [type, setType] = useState<NewEntry['type']>('HealthCheck');
    const [baseFields, setBaseFields] = useState<BaseValues>({
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: []
    });

    return (
        <div>
            <BaseFieldsForm baseFields={baseFields} setBaseFields={setBaseFields} />
            <select value={type} onChange={(e) => setType(e.target.value as NewEntry['type'])}>
                <option value="HealthCheck">Health Check</option>   
                <option value="Hospital">Hospital</option>
                <option value="OccupationalHealthcare">Occupational Healthcare</option>
            </select>
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
