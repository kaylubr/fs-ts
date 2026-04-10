import { useEffect, useState } from "react";
import type { DiaryEntries } from "./types";
import diaryEntriesService from "./services/diaryEntriesService";
import DiaryItems from "./components/DiaryEntries";
import DiaryEntryForm from "./components/DiaryEntryForm";

const App = () => {
  const [entries, setEntries] = useState<DiaryEntries[]>([])

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await diaryEntriesService.getAll()
      setEntries(response)
    }

    fetchEntries()
  }, [])

  return (
    <>
      <DiaryEntryForm currentEntries={entries} updateEntries={setEntries}/>
      <DiaryItems entries={entries} />
    </>
  )
};

export default App;