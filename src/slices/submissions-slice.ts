import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface SubmissionState {
  name: string;
  age: number;
  email: string;
  password: string;
  gender: string;
  country: string;
  createdAt: string;
  profilePicture: string;
}

const initialState: SubmissionState[] = [];

export const submissionsSlice = createSlice({
  name: 'submissions',
  initialState,
  reducers: {
    addSubmission: (state, action: PayloadAction<SubmissionState>) => {
      state.push(action.payload);
    },
    deleteSubmission: (state, action: PayloadAction<string>) => {
      return state.filter(
        (submission) => submission.createdAt !== action.payload
      );
    },
  },
});

export const { addSubmission, deleteSubmission } = submissionsSlice.actions;
export const selectSubmissions = (state: { submissions: SubmissionState[] }) =>
  state.submissions;
export default submissionsSlice.reducer;
