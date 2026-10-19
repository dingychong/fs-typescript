import { Dialog, DialogTitle, DialogContent, Divider, Alert } from '@mui/material';

import AddPatientForm from "./AddPatientForm";

import { NewPatientEntry } from "../../types";
import { useEffect } from 'react';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: NewPatientEntry) => void;
  setError: (error: string) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, setError, error }: Props) => {
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);
  return (
   <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add a new patient</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddPatientForm onSubmit={onSubmit} onCancel={onClose}/>
      </DialogContent>
    </Dialog>
  );
};

export default AddPatientModal;
