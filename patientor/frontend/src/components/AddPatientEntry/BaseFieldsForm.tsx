import { TextField, Select, MenuItem, FormControl, InputLabel} from "@mui/material";

import { Diagnosis } from "../../types";

type BaseValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

type props = {
    baseFields: BaseValues;
    setBaseFields: React.Dispatch<React.SetStateAction<BaseValues>>;
    diagnosisDetails: Diagnosis[];
}

const BaseFieldsForm = ({ baseFields, setBaseFields, diagnosisDetails }: props) => {
    return (
        <div>
            <TextField
                placeholder = "description"
                value = {baseFields.description}
                onChange = { (e) => setBaseFields({...baseFields, description: e.target.value})}
            />
            <TextField
                type = "date"
                placeholder = "date"
                value = {baseFields.date}
                onChange = { (e) => setBaseFields({...baseFields, date: e.target.value})}
            />
            <TextField
                placeholder = "specialist"
                value = {baseFields.specialist}
                onChange = { (e) => setBaseFields({...baseFields, specialist: e.target.value})}
            />
            <FormControl sx={{minWidth: 200 }}>
                <InputLabel id="diagnosis-codes-label">Diagnosis Codes</InputLabel>
                <Select
                    multiple
                    labelId = "diagnosis-codes-label"
                    label="Diagnosis Codes"
                    value = {baseFields.diagnosisCodes}
                    onChange = { (e) => setBaseFields({...baseFields, diagnosisCodes: (typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)})}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                >
                    {diagnosisDetails.map((diagnosis) => (
                        <MenuItem
                            key={diagnosis.code}
                            value={diagnosis.code}
                        >
                            {diagnosis.code} - {diagnosis.name}
                        </MenuItem>
                    ))}
                
                </Select>
            </FormControl>
        </div>
    )

};

export default BaseFieldsForm;