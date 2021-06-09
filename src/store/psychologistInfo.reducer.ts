import {createSlice} from '@reduxjs/toolkit';

export type dateAndTime = {
  date: Date,
  time: string[],
}

interface IInitialStateProps {
  name: string,
  photo: string,
  sessionDuration: string,
  dateAndTime: dateAndTime[],
}

/**
 * Static info
 */
const initialState: IInitialStateProps = {
  name: 'Алексей Карачинский',
  sessionDuration: '50 минут',
  photo: '/img/man.svg',
  dateAndTime: [
    {
      date: new Date(),
      time: ['18:00', '18:30', '19:00', '19:30', '20:00', '21:00'],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 1)),
      time: ['18:00', '18:45', '19:00', '19:45', '20:00', '21:45'],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 2)),
      time: ['18:00', '18:30', '19:00', '19:30', '20:00', '21:00'],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 3)),
      time: ['18:00', '18:45', '19:00', '19:45', '20:00', '21:45'],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 4)),
      time: ['18:00', '18:30', '19:00', '19:30', '20:00', '21:00'],
    },
    {
      date: new Date(new Date().setDate(new Date().getDate() + 5)),
      time: ['18:00', '18:45', '19:00', '19:45', '20:00', '21:45'],
    },
  ],
};

const slice = createSlice({
  name: 'psychologistInfo',
  initialState,
  reducers: {},
});


export default slice.reducer;
