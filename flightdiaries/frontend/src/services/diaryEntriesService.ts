import axios from "axios"
import type { DiaryEntries, NewDiaryEntry } from "../types"

const baseUrl = '/api/diaries'

const getAll = async () => {
  const response = await axios.get<DiaryEntries[]>(baseUrl)
  return response.data
}

const addEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, addEntry }