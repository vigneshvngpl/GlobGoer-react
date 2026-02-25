import { createSlice } from '@reduxjs/toolkit';
import flightData from '../data/flights.json';

const initialState = {
  fromCity: null,
  toCity: null,
  tripType: '',
  travelClass: '',
  departDate:null,
  returnDate:null,
  flightType:"",
  results: flightData.flights,
  searched: true,

};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action) {
      const { fromCity, toCity, tripType, travelClass,departDate,returnDate,flightType } = action.payload;

      state.fromCity = fromCity;
      state.toCity = toCity;
      state.tripType = tripType;
      state.travelClass = travelClass;
      state.departDate=departDate
      state.returnDate=returnDate
      state.flightType=flightType

      const baseFlights = flightData.flights.filter((f) => {

        

        if (fromCity && f.departure.city !== fromCity) return false;
        if (toCity && f.arrival.city !== toCity) return false;
        if(departDate && f.departure.timestamp){
          const selectedDate =new Date(departDate).toDateString();
          if(selectedDate !== flightData){
return true
          }
        }

        if (
          travelClass &&
          f.travelClass.toLowerCase() !== travelClass.toLowerCase()
        ){return false;}
          
         if (tripType === 'international') {
          if (f.departure.city !== f.arrival.city) {
            return false
          }
        }

        if (tripType === 'domestic') {
          if (f.departure.city !== f.arrival.city) {
            return false
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