import axios from 'axios';
import type { NonSensitiveDiaryEntry, NewDiaryEntry, DiaryEntry} from '../types';

import { apiBaseUrl } from '../constants';

export const getDiaries = async () => {
    const response = await axios.get<NonSensitiveDiaryEntry []>(`${apiBaseUrl}/diaries`);
    return response.data;
}

export const addDiary = async (newDiary: NewDiaryEntry) => {
    const response = await axios.post<DiaryEntry>(`${apiBaseUrl}/diaries`, newDiary);
    return response.data;
};