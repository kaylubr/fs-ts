import type { DiaryEntries, } from "../types";
import Header from "./Header";

interface DiaryEntriesProps {
  entries: DiaryEntries[]
}

const cardStyle = {
  border: 'solid 1px black',
  padding: '1rem',
  marginBottom: '1rem'
}

const dateStyle = {
  marginBottom: '1rem',
  fontWeight: 'bold'
}

const DiaryItems = ({ entries }: DiaryEntriesProps) => {
  return (
    <>
      <Header title="Flight Diary" />
      {entries.map(entry => (
        <div key={entry.id} style={cardStyle}>
          <div style={dateStyle}>{entry.date}</div>
          <div>Weather: <b>{entry.weather}</b></div>
          <div>Visiblity: <b>{entry.visibility}</b></div>
        </div>
      ))}
    </>
  )
};

export default DiaryItems;