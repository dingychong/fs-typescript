import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import patientService from '../../services/patients';
import type { Patient, Diagnosis } from '../../types';

import EntryDetails from './EntryDetails';

import AddEntryForm from "../AddPatientEntry/index";


const PatientDetailsPage = () => {
    const id = useParams<{ id: string }>().id;
    const [data, setData] = useState<Patient | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [diagnosisDetails, setDiagnosisDetails] = useState<Diagnosis[]>([]);

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
    }, [id]);
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
        

    if (!id) {
        return <div>No patient with this ID found.</div>;
    }

    if (error) {
        return <div>{error}</div>;
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
            <AddEntryForm onSubmit={() => {}} onCancel={() => {}} />
        </div>

    )

}

export default PatientDetailsPage;
