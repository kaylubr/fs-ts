import { Fragment, useState, type ChangeEvent, type Dispatch, type SetStateAction, type SyntheticEvent } from "react";
import diaryEntriesService from "../services/diaryEntriesService";
import { VisibilityOptions, WeatherOptions } from "../types";
import type { Weather, Visibility, DiaryEntries } from "../types";
import Header from "./Header";
import Notification from "./Notification";
import axios from "axios";

interface DiaryEntryFormProps {
  currentEntries: DiaryEntries[]
  updateEntries: Dispatch<SetStateAction<DiaryEntries[]>>
}

const DiaryEntryForm = ({ currentEntries, updateEntries }: DiaryEntryFormProps) => {
  const [weather, setWeather] = useState<Weather>('sunny')
  const [visibility, setVisibility] = useState<Visibility>('good')
  const [date, setDate] = useState('')
  const [error, setError] = useState<string | null>(null);

  const handleWeather = (event: ChangeEvent<HTMLInputElement>) => {
    setWeather(event.target.value as Weather)
  };

  const handleVisibility = (event: ChangeEvent<HTMLInputElement>) => {
    setVisibility(event.target.value as Visibility)
  };

  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      const newEntry = await diaryEntriesService.addEntry({ weather, visibility, date })
      updateEntries(currentEntries.concat(newEntry))

      setWeather('sunny')
      setVisibility('good')
      setDate('')
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data.error[0].message
        setError(`Error: ${errorMessage}`)
        setTimeout(() => {
          setError(null)
        }, 3000)
      }
    }
  };

  return (
    <>
      <Header title="Add new entry" />
      { error && <Notification message={error}/> }
      <div>
        <form onSubmit={handleSubmit} className="diary-entry-form">
          <div>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </div>
          <div>
            <label htmlFor={visibility}>Visibility &nbsp;&nbsp;</label>
            {Object.values(VisibilityOptions).map(option => (
              <Fragment key={option}>
                <label htmlFor={option}>{option}</label>
                <input 
                  type="radio" 
                  value={option} 
                  onChange={handleVisibility}
                  checked={visibility === option}
                  id={option} 
                />
                &nbsp;
              </Fragment>
            ))}
          </div>
          <div>
            <label htmlFor={weather}>Weather &nbsp;&nbsp;</label>
            {Object.values(WeatherOptions).map(option => (
              <Fragment key={option}>
                <label htmlFor={option}>{option}</label>
                <input 
                  type="radio" 
                  value={option} 
                  id={option} 
                  onChange={handleWeather}
                  checked={weather === option}
                />
                &nbsp;
              </Fragment>
            ))}
          </div>
          <button>Add</button>
        </form>
      </div>
    </>
  )
};

export default DiaryEntryForm