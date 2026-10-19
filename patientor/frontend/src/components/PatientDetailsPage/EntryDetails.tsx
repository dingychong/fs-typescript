import type { Entry, Diagnosis } from '../../types';
import EntryCard from './EntryCard';

interface EntryDetailsProps {
    entry: Entry;
    diagnosisDetails: Diagnosis[];
}

const HealthCheckEntryDetails = ({ entry, diagnosisDetails }: EntryDetailsProps) => {
    if (entry.type !== "HealthCheck") {
        return null;
    }
    return <div>
        <p>Date: {entry.date} </p>
        <p><strong>Health Check Entry</strong></p>
        <p>Description: {entry.description}</p>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Health Check Rating: {entry.healthCheckRating}</p>
        {entry.diagnosisCodes && <div>
            <p>Diagnosis Codes:</p>
            <ul>
                {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code} : {diagnosisDetails.find(d => d.code === code)?.name || 'Unknown Diagnosis Code'}</li>
                ))}
            </ul>
        </div>}
    </div>
}

const OccupationalHealthcareEntryDetails = ({ entry, diagnosisDetails }: EntryDetailsProps) => {
    if (entry.type !== "OccupationalHealthcare") {
        return null;
    }
    return <div>
        <p>Date: {entry.date} </p>
        <p><strong>Occupational Healthcare Entry</strong></p>
        <p>Description: {entry.description}</p>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Employer: {entry.employerName}</p>
        {entry.diagnosisCodes && <div>
            <p>Diagnosis Codes:</p>
            <ul>
                {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code} : {diagnosisDetails.find(d => d.code === code)?.name || 'Unknown Diagnosis Code'}</li>
                ))}
            </ul>
        </div>}
    </div>
}

const HospitalEntryDetails = ({ entry, diagnosisDetails }: EntryDetailsProps) => {
    if (entry.type !== "Hospital") {
        return null;
    }
    return <div>
        <p>Date: {entry.date} </p>
        <p><strong>Hospital Entry</strong></p>
        <p>Description: {entry.description}</p>
        <p>Diagnosed by {entry.specialist}</p>
        <p>Discharge Date: {entry.discharge.date}</p>
        <p>Discharge Criteria: {entry.discharge.criteria}</p>
        {entry.diagnosisCodes && <div>
            <p>Diagnosis Codes:</p>
            <ul>
                {entry.diagnosisCodes.map((code) => (
                    <li key={code}>{code} : {diagnosisDetails.find(d => d.code === code)?.name || 'Unknown Diagnosis Code'}</li>
                ))}
            </ul>
        </div>}
    </div>
}

const EntryDetails = ({ entry, diagnosisDetails }: EntryDetailsProps) => {
    switch (entry.type) {
        case "HealthCheck":
            return <EntryCard entry={entry} ><HealthCheckEntryDetails entry={entry} diagnosisDetails={diagnosisDetails} /></EntryCard>;
        case "OccupationalHealthcare":
            return <EntryCard entry={entry} ><OccupationalHealthcareEntryDetails entry={entry} diagnosisDetails={diagnosisDetails} /></EntryCard>;
        case "Hospital":
            return <EntryCard entry={entry} ><HospitalEntryDetails entry={entry} diagnosisDetails={diagnosisDetails} /></EntryCard>;
        default:
            return assertNever(entry);
    }
}

export default EntryDetails;

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
}