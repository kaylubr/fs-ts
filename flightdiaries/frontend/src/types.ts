export const WeatherOptions = {
  Rainy: 'rainy',
  Sunny: 'sunny',
  Windy: 'windy',
  Cloudy: 'cloudy',
} as const;

export type Weather = typeof WeatherOptions[keyof typeof WeatherOptions]

export const VisibilityOptions = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor'
} as const;

export type Visibility = typeof VisibilityOptions[keyof typeof VisibilityOptions]

export interface DiaryEntries {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
}

export type NewDiaryEntry = Omit<DiaryEntries, 'id'>