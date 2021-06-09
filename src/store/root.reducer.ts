import {combineReducers, configureStore} from '@reduxjs/toolkit';
import psychologistInfo from './psychologistInfo.reducer';
import user from './user.reducer';

const rootReducer = combineReducers({
  psychologistInfo,
  user,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type Store = ReturnType<typeof rootReducer>;
