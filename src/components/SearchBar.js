import React, { useState } from 'react';
import { DatePicker, theme } from 'antd';
import searchBarOptions from '../data/Searchbaroptions';
import './SearchBar.css';
import { useDispatch } from 'react-redux';
import { setSearchParams } from '../store/searchSlice';
import CityDropdown from './CityDropdown';

const { RangePicker } = DatePicker;

export default function SearchBar() {
  const [from, setFrom] = useState(null);
  const [to, setTo] = useState(null);
  const dispatch = useDispatch();

  const [flightType, setFlightType] = useState('');
  const [travelClass, setTravelClass] = useState('');
  const [tripType, setTripType] = useState('');

  const [departDate, setDepartDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const { token } = theme.useToken();
  const isRoundTrip = flightType === 'round';

  const cellRender = (current, info) => {
    const style = {
      border: `1px solid ${token.colorPrimary}`,
      borderRadius: '50%',
    };

    if (info.type !== 'date') return info.originNode;

    return (
      <div
        className="ant-picker-cell-inner"
        style={current.date() === 1 ? style : {}}
      >
        {current.date()}
      </div>
    );
  };

  const handleSearch = () => {
    dispatch(
      setSearchParams({
        fromCity: from?.city || null,
        toCity: to?.city || null,
        tripType,
        travelClass,
      })
    );
  };

  return (
    <section className="searchbar">
      <div className="searchbar-top">

        <select
          className="searchbar-select"
          value={flightType}
          onChange={(e) => setFlightType(e.target.value)}
        >
          <option value="">
            {searchBarOptions.flightType.placeholder}
          </option>
          {searchBarOptions.flightType.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="searchbar-select"
          value={travelClass}
          onChange={(e) => setTravelClass(e.target.value)}
        >
          <option value="">
            {searchBarOptions.travelClass.placeholder}
          </option>
          {searchBarOptions.travelClass.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <select
          className="searchbar-select"
          value={tripType}
          onChange={(e) => setTripType(e.target.value)}
        >
          <option value="">
            {searchBarOptions.tripType.placeholder}
          </option>
          {searchBarOptions.tripType.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

      </div>

      <div className="searchbar-bottom">

        <CityDropdown
          placeholder="From"
          icon="/SearchBar/from.png"
          value={from}
          onChange={setFrom}
        />

        <button
          className="searchbar-swap"
          onClick={() => {
            const temp = from;
            setFrom(to);
            setTo(temp);
          }}
        >
          <img src="/SearchBar/swap.png" alt="swap icon" className="searchbar-icon" />
        </button>

        <CityDropdown
          placeholder="To"
          icon="/SearchBar/to.png"
          value={to}
          onChange={setTo}
        />

        <div className="searchbar-input-wrap searchbar-date-wrap">
          <img src="/SearchBar/date.png" alt="date icon" className="searchbar-icon" />

          {isRoundTrip ? (
            <RangePicker
              cellRender={cellRender}
              placeholder={["Departing", "Returning"]}
              variant="borderless"
              className="searchbar-antd-picker"
              onChange={(dates) => {
                setDepartDate(dates?.[0] ?? null);
                setReturnDate(dates?.[1] ?? null);
              }}
            />
          ) : (
            <DatePicker
              cellRender={cellRender}
              placeholder="Departing"
              variant="borderless"
              className="searchbar-antd-picker"
              onChange={(date) => setDepartDate(date)}
            />
          )}
        </div>

        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/passengers.png"
            alt="passengers icon"
            className="searchbar-icon"
          />
          <input
            type="text"
            placeholder="Travellers"
            className="searchbar-input"
          />
        </div>

        <button
          className="searchbar-search-btn"
          onClick={handleSearch}
        >
          <img
            src="/SearchBar/search.png"
            alt="search icon"
            className="searchbar-icon"
          />
          Search
        </button>

      </div>
    </section>
  );
}