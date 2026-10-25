import { useState, SyntheticEvent } from "react";

import {  TextField, InputLabel, MenuItem, Select, Grid, Button, SelectChangeEvent } from '@mui/material';

import { NewEntry, type HealthCheckRating } from "../../types";

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
const AddHealthCheckForm = ({ onCancel, onSubmit, baseFields }: Props) => {
    const [healthCheckRating, setHealthCheckRating] = useState<HealthCheckRating>(0);

  const addHealthCheckEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      ...baseFields,
      type: "HealthCheck",
      healthCheckRating
    });

  };

  return (
    <>
    <Select value={healthCheckRating} onChange={(e) => setHealthCheckRating(Number(e.target.value) as HealthCheckRating)}>
        <MenuItem value={0}>0 - Healthy</MenuItem>
        <MenuItem value={1}>1 - Low Risk</MenuItem>
        <MenuItem value={2}>2 - High Risk</MenuItem>
        <MenuItem value={3}>3 - Critical Risk</MenuItem>
    </Select>
    <Button type="submit" onClick={addHealthCheckEntry}>Add Health Check Entry</Button>
    <Button onClick={onCancel}>Cancel</Button>
    </>
  )
};

export default AddHealthCheckForm;