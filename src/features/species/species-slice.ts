import { SpeciesResult } from '../../services/sw-api';
import { createSlice } from '@reduxjs/toolkit';

export interface SpeciesState {
  currentItems: SpeciesResult[];
  totalCount: number;
  isLoading: boolean;
  selectedItems: { [key: string]: SpeciesResult };
  currentDetails: SpeciesResult | null;
}

const initialState: SpeciesState = {
  currentItems: [],
  totalCount: 0,
  isLoading: false,
  selectedItems: {},
  currentDetails: null,
};

export const speciesSlice = createSlice({
  name: 'species',
  initialState,
  reducers: {
    selectItem: (state, action) => {
      const item = action.payload;
      state.selectedItems[item.id] = item;
    },
    unselectItem: (state, action) => {
      const item = action.payload;
      // below workaround for TS error
      const newSelectedItems = { ...state.selectedItems };
      state.selectedItems = Object.fromEntries(
        Object.entries(newSelectedItems).filter(([key]) => key !== item.id)
      );
    },
    unselectAllItems: (state) => {
      state.selectedItems = {};
    },
  },
});

export const { selectItem, unselectItem, unselectAllItems } =
  speciesSlice.actions;

export default speciesSlice.reducer;
