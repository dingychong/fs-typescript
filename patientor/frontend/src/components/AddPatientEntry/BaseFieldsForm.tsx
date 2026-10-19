type BaseValues = {
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: string[];
}

type props = {
    baseFields: BaseValues;
    setBaseFields: React.Dispatch<React.SetStateAction<BaseValues>>;
}

const BaseFieldsForm = ({ baseFields, setBaseFields }: props) => {
    return (
        <div>
            <input
                placeholder = "description"
                value = {baseFields.description}
                onChange = { (e) => setBaseFields({...baseFields, description: e.target.value})}
            />
            <input
                placeholder = "date"
                value = {baseFields.date}
                onChange = { (e) => setBaseFields({...baseFields, date: e.target.value})}
            />
            <input
                placeholder = "specialist"
                value = {baseFields.specialist}
                onChange = { (e) => setBaseFields({...baseFields, specialist: e.target.value})}
            />
            <input
                placeholder = "diagnosis codes"
                value = {baseFields.diagnosisCodes}
                onChange = { (e) => setBaseFields({...baseFields, diagnosisCodes: e.target.value.split(',')})}
            />
            
        </div>
    )

};

export default BaseFieldsForm;