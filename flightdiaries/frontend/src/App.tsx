import { useState, useEffect } from 'react'
import type { NonSensitiveDiaryEntry } from './types'
import { getDiaries } from './services/diaries'
import AddNewDiaryForm from './components/NewDiaryForm/AddNewDiaryForm'
import './App.css'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    const fetchDiaries = async () => {
      try {
        const data = await getDiaries()
        setDiaries(data)
      } catch (error) {
        console.error('Error fetching diaries:', error)
      }
    }

    fetchDiaries()
  }, [])
  return (
    <div>
      <h1>Flight Diaries</h1>
      <ul>
        {diaries.map((diary) => (
          <li key={diary.id}>
            <strong>Date:</strong> {diary.date} | <strong>Weather:</strong> {diary.weather} | <strong>Visibility:</strong> {diary.visibility}
          </li>
        ))}
      </ul>
      <AddNewDiaryForm setDiaries={setDiaries} />
    </div>
  )
}

export default App
