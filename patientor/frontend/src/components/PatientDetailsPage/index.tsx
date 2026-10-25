import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Patient, Diagnosis, NewEntry} from '../../types';

import EntryDetails from './EntryDetails';

import AddEntryForm from "../AddPatientEntry/index";
import axios from 'axios';



const PatientDetailsPage = ({ patients, setPatients }: { patients: Patient[]; setPatients: React.Dispatch<React.SetStateAction<Patient[]>> }) => {
    const id = useParams<{ id: string }>().id;
    const [data, setData] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [diagnosisDetails, setDiagnosisDetails] = useState<Diagnosis[]>([]);

    if (!id) {
        return <div>No patient with this ID found.</div>;
    }
    useEffect(() => {
        if (!id) {
            return;
        }

        let cancelled = false;
        const fetchPatient = async () => {
            try {
                const patient = await patientService.getPatientById(id);
                if (!cancelled) {
                    setData(patient);
                }
            } catch {
                if (!cancelled) {
                    setError('Unable to load patient details.');
                }
            }
        };

        void fetchPatient();
        return () => {
            cancelled = true;
        };
    }, [id, patients]);
    useEffect(() => {
        const fetchDiagnoses = async () => {
            try {
                const diagnoses = await patientService.getDiagnoses();
                setDiagnosisDetails(diagnoses);
            } catch {
                return;
            }
        }
        void fetchDiagnoses();
    }, [id]);
    

      const submitNewEntry = async (values: NewEntry) => {
        try {
          const patient: Patient = await patientService.postEntry(id, values);
          setPatients(patients.map(p => p.id === patient.id ? patient : p ));
        } catch (e: unknown) {
          if (axios.isAxiosError(e)) {
            const data = e.response?.data;
            if (data && Array.isArray(data.error)) {
              const message = data.error
                .map((issue: { path: (string | number)[]; message: string }) =>
                  `${issue.path.join('.')}: ${issue.message}`
                )
                .join(', ');
              console.error(message);
              setError(message);
            } else {
              setError("Unrecognized axios error");
            }
          } else {
            console.error("Unknown error", e);
            setError("Unknown error");
          }
        }
      };

    if (!id) {
        return <div>No patient with this ID found.</div>;
    }

    if (!data || data.id !== id) {
        return <div>Loading patient details...</div>;
    }

    return (
        <div>
            <h2>Patient Details</h2>
            <p>Name: {data.name}</p>
            <p>Gender: {data.gender}</p>
            <p>Occupation: {data.occupation}</p>
            <p>Date of Birth: {data.dateOfBirth}</p>
            <h3>Entries</h3>
            {data.entries.length > 0 ? (
                data.entries.map((entry) => (
                    <EntryDetails key={entry.id} entry={entry} diagnosisDetails={diagnosisDetails} />
                ))
            ) : (
                <p>No entries available.</p>
            )}
            <AddEntryForm onSubmit={submitNewEntry} onCancel={() => {}} error={error} setError={setError} diagnosisDetails={diagnosisDetails} />
        </div>

    )

}

export default PatientDetailsPage;
