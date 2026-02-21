import { createSlice } from '@reduxjs/toolkit';
import flightData from '../data/flights.json';

const initialState = {
  fromCity: null,
  toCity: null,
  tripType: '',
  travelClass: '',
  results: [],
  searched: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action) {
      const { fromCity, toCity, tripType, travelClass } = action.payload;

      state.fromCity = fromCity;
      state.toCity = toCity;
      state.tripType = tripType;
      state.travelClass = travelClass;

      const baseFlights = flightData.flights.filter((f) => {

        if (fromCity && f.departure.city !== fromCity) return false;
        if (toCity && f.arrival.city !== toCity) return false;

        if (
          travelClass &&
          f.travelClass.toLowerCase() !== travelClass.toLowerCase()
        )
          return false;

        if (tripType === 'domestic') {
          if (f.departure.city !== f.arrival.city) {
          }
        }

        return true;
      });

      state.results = baseFlights;
      state.searched = true;
    },

    resetSearch() {
      return initialState;
    },
  },
});

export const { setSearchParams, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;