import { useState, SyntheticEvent } from "react";

import {  TextField, Button} from '@mui/material';

import { NewEntry } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: NewEntry) => void;
  baseFields: {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
  };
}

const AddHospitalEntryForm = ({ onCancel, onSubmit, baseFields }: Props) => {
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');

  const addHospitalEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      ...baseFields,
      type: "Hospital",
      discharge: {
        date: dischargeDate,
        criteria: dischargeCriteria
      }
    });
  };
  
  return (
    <>
        <TextField
            type="date"
            label="Discharge Date"
            fullWidth
            value={dischargeDate}
            onChange={({ target }) => setDischargeDate(target.value)}
        />
        <TextField
            label="Discharge Criteria"
            fullWidth
            value={dischargeCriteria}
            onChange={({ target }) => setDischargeCriteria(target.value)}
        />
        <Button type="submit" onClick={addHospitalEntry}>Add Hospital Entry</Button>
        <Button onClick={onCancel}>Cancel</Button>
    </>
  )
};

export default AddHospitalEntryForm;