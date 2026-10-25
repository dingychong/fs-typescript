import { useState, SyntheticEvent } from "react";

import {  TextField, Button } from '@mui/material';


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

const AddOccupationalHealthcareEntryForm = ({ onCancel, onSubmit, baseFields }: Props) => {
  const [employerName, setEmployerName] = useState('');
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
  
  const addOccupationalHealthcareEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    try {
    onSubmit({
      ...baseFields,
      type: "OccupationalHealthcare",
      employerName,
      sickLeave: 
        sickLeaveStartDate && sickLeaveEndDate 
        ? { startDate: sickLeaveStartDate, endDate: sickLeaveEndDate } 
        : undefined
    });
    setEmployerName('');
    setSickLeaveStartDate('');
    setSickLeaveEndDate('');
    } catch (error) {
      console.error("Error adding occupational healthcare entry:", error);
    } 

  };
  
  return (
    <>
        <TextField
            label="Employer Name"
            fullWidth
            value={employerName}
            onChange={({ target }) => setEmployerName(target.value)}
        />
        <TextField
            type="date"
            label="Sick Leave Start Date"
            fullWidth
            value={sickLeaveStartDate}
            onChange={({ target }) => setSickLeaveStartDate(target.value)}
        />
        <TextField
            type="date"
            label="Sick Leave End Date"
            fullWidth
            value={sickLeaveEndDate}
            onChange={({ target }) => setSickLeaveEndDate(target.value)}
        />


        <Button type="submit" onClick={addOccupationalHealthcareEntry}>Add Occupational Healthcare Entry</Button>
        <Button onClick={onCancel}>Cancel</Button>
    </>
  )
};

export default AddOccupationalHealthcareEntryForm;