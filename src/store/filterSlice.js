import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stops: [],
  airlines: [],
  baggage: [],
  departureRange: [0, 1439],
  arrivalRange: [0, 1439],
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    toggleStop(state, action) {
      const val = action.payload;
      if (state.stops.includes(val)) {
        state.stops = state.stops.filter(s => s !== val);
      } else {
        state.stops.push(val);
      }
    },
    toggleAirline(state, action) {
      const val = action.payload;
      if (state.airlines.includes(val)) {
        state.airlines = state.airlines.filter(a => a !== val);
      } else {
        state.airlines.push(val);
      }
    },
    toggleBaggage(state, action) {
      const val = action.payload;
      if (state.baggage.includes(val)) {
        state.baggage = state.baggage.filter(b => b !== val);
      } else {
        state.baggage.push(val);
      }
    },
    setDepartureRange(state, action) {
      state.departureRange = action.payload;
    },
    setArrivalRange(state, action) {
      state.arrivalRange = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  toggleStop,
  toggleAirline,
  toggleBaggage,
  setDepartureRange,
  setArrivalRange,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
