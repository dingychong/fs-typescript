import { useState, type SyntheticEvent, type ChangeEvent } from 'react'
import type { NewDiaryEntry, NonSensitiveDiaryEntry } from '../../types'
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
            <TextField
                label="Date"
                value={date}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value)}
                fullWidth
                margin="normal"
            />

            <InputLabel id="weather-label">Weather</InputLabel>
            <Select
                labelId="weather-label"
                value={weather}
                onChange={(e: SelectChangeEvent) => setWeather(e.target.value as NewDiaryEntry['weather'])}
                fullWidth
            >
                <MenuItem value="sunny">Sunny</MenuItem>
                <MenuItem value="rainy">Rainy</MenuItem>
                <MenuItem value="cloudy">Cloudy</MenuItem>
                <MenuItem value="stormy">Stormy</MenuItem>
                <MenuItem value="windy">Windy</MenuItem>
            </Select>

            <InputLabel id="visibility-label">Visibility</InputLabel>
            <Select
                labelId="visibility-label"
                value={visibility}
                onChange={(e: SelectChangeEvent) => setVisibility(e.target.value as NewDiaryEntry['visibility'])}
                fullWidth
            >
                <MenuItem value="great">Great</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="ok">Ok</MenuItem>
                <MenuItem value="poor">Poor</MenuItem>
            </Select>

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
