import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {
  addDoc,
  collection,
  getFirestore,
  updateDoc,
  DocumentReference,
  getDocs,
  doc,
  QuerySnapshot,
} from 'firebase/firestore';

interface IInitialStateProps{
  docRef?: DocumentReference,
  date: Date,
  time: string,
}

const initialState: IInitialStateProps = {date: new Date(), time: ''};

/**
 * Redux async thunk. Get data from firebase
 * @returns QuerySnapshot
 */
export const getDataFromDatabase = createAsyncThunk('user/getDataFromDatabase',
    async () => {
      const db = getFirestore();
      const data: QuerySnapshot = await getDocs(collection(db, 'user'));
      return data;
    },
);

/**
 * Redux async thunk. Create(!docRef) or update(docRef) user info in firebase
 * @returns IInitialStateProps
 */
export const pushToDatabase = createAsyncThunk('user/pushToDatabase',
    async (arg: IInitialStateProps) => {
      const db = getFirestore();
      try {
        if (arg.docRef) {
          await updateDoc(arg.docRef, {
            date: arg.date,
            time: arg.time,
          });
          return arg;
        } else {
          const docRef = await addDoc(collection(db, 'user'), {
            date: arg.date,
            time: arg.time,
          });
          return {...arg, docRef};
        }
      } catch (e: any) {
        console.error('Error adding document: ', e);
      }
    },
);


const slice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    changeSessionStartTime(state, action: {type: string, payload: IInitialStateProps}) {
      return action.payload;
    },
  },
  extraReducers: {
    [getDataFromDatabase.fulfilled.type]: (state, action: {type: string, payload: QuerySnapshot}) => {
      const db = getFirestore();
      const docs = action.payload.docs[0];
      if (docs) {
        state.docRef = doc(db, 'user', docs.id);
        state.date = new Date(docs.data().date.seconds * 1000);
        state.time = docs.data().time;
      } else {
        return initialState;
      }
    },
    [getDataFromDatabase.rejected.type]: () => {
      console.log('GetDataFromDatabase action was broken');
    },
    [pushToDatabase.fulfilled.type]: (state, action: {type: string, payload: IInitialStateProps}) => {
      state.docRef = action.payload.docRef;
      state.date = action.payload.date;
      state.time = action.payload.time;
    },
    [pushToDatabase.rejected.type]: () => {
      console.log('PushToDataBase action was broken');
    },
  },
});


export default slice.reducer;
