import { useState, type SyntheticEvent, type ChangeEvent } from 'react'
import { Visibility, Weather, type NewDiaryEntry, type NonSensitiveDiaryEntry } from '../../types'
import { TextField, InputLabel, MenuItem, Select, Button, type SelectChangeEvent } from '@mui/material'
import { addDiary } from '../../services/diaries'

type AddNewDiaryFormProps = {
    setDiaries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>
}

const AddNewDiaryForm = ({ setDiaries }: AddNewDiaryFormProps) => {
    const [date, setDate] = useState('')
    const [weather, setWeather] = useState<NewDiaryEntry['weather'] | ''>('')
    const [visibility, setVisibility] = useState<NewDiaryEntry['visibility'] | ''>('')
    const [comment, setComment] = useState('')

    const onSubmit = async (newDiaryEntry: NewDiaryEntry) => {
        try {
            const addedDiary = await addDiary(newDiaryEntry)
            console.log('Diary entry added:', addedDiary)
            // Optionally, you can reset the form fields after successful submission
            setDate('')
            setWeather('')
            setVisibility('')
            setComment('')
            setDiaries(prevDiaries => [...prevDiaries, addedDiary])
            return addedDiary
        } catch (error) {
            console.error('Error adding diary entry:', error)
        }
    }
            
    const addDiaryEntry = async (event: SyntheticEvent) => {
        event.preventDefault()

        const newDiaryEntry: NewDiaryEntry = {
            date,
            weather: weather as NewDiaryEntry['weather'],
            visibility: visibility as NewDiaryEntry['visibility'],
            comment
        }

        try {
            await onSubmit(newDiaryEntry)
        } catch (error: unknown) {
            console.error('Error adding diary entry:', error)
        }
    }

    return (
        <form onSubmit={addDiaryEntry}>
            <InputLabel id="date-label">Date</InputLabel>
                <input
                    type="date"
                    value={date}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                />
            
            <fieldset>
                <legend> Weather Options </legend>
                {Object.values(Weather).map((weatherOption) => (
                    <label key={weatherOption}>
                        <input
                            type="radio"
                            name="weather"
                            value={weatherOption}
                            checked={weather === weatherOption}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setWeather(e.target.value as NewDiaryEntry['weather'])}
                        />
                        {weatherOption}
                    </label>
                ))} 
            </fieldset>
            <fieldset>
                <legend> Visibility Options </legend>
                {Object.values(Visibility).map((v)=> (
                    <input
                        type="radio"
                        name="visibility"
                        value ={v}
                        checked={visibility === v}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setVisibility(e.target.value as NewDiaryEntry['visibility'])}
                    />
                ))}
            </fieldset>

            <TextField
                label="Comment"
                value={comment}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setComment(e.target.value)}
                fullWidth
            />

            <Button type="submit" variant="contained" color="primary">
                Add Diary Entry
            </Button>
        </form>
    )
}

export default AddNewDiaryForm
