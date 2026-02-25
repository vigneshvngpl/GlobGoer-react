import React from 'react';
import { Slider } from 'antd';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  toggleStop,
  toggleAirline,
  toggleBaggage,
  setDepartureRange,
  setArrivalRange,
  resetFilters,
} from '../store/filterSlice';
import flightData from '../data/flights.json';
import './FilterSidebar.css';

const { filterOptions } = flightData;
function minutesToTime(mins) {
  const date = new Date(0); 
  date.setMinutes(mins);    

  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function CheckRow({ label, price, checked, onChange }) {
  return (
    <label className="check-row">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="check-input"
      />
      <span className="check-label">{label}</span>
      <span className="check-price">$ {price}</span>
    </label>
  );
}

function SectionHeader({ left, right }) {
  return (
    <div className="section-header">
      <span>{left}</span>
      {right && <span>{right}</span>}
    </div>
  );
}

const sliderStyles = {
  track: { backgroundColor: 'rgba(93, 54, 175, 1)' },
  handle: { borderColor: 'rgba(93, 54, 175, 1)', backgroundColor: 'rgba(93, 54, 175, 1)' },
  rail: { backgroundColor: '#e5e7eb' },
};

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(state => state.filters);

  return (
    <aside className="filter-sidebar">
      <h2 className="filter-title">Filter By</h2>

      <div className="filter-section">
        <SectionHeader left="Stop" right="From" />
        {filterOptions.stops.map(s => (
          <CheckRow
            key={s.value}
            label={s.label}
            price={s.price}
            checked={filters.stops.includes(s.value)}
            onChange={() => dispatch(toggleStop(s.value))}
          />
        ))}
      </div>

      <div className="filter-section">
        <SectionHeader left="Airlines" right="From" />
        {filterOptions.airlines.map(a => (
          <CheckRow
            key={a.value}
            label={a.label}
            price={a.price}
            checked={filters.airlines.includes(a.value)}
            onChange={() => dispatch(toggleAirline(a.value))}
          />
        ))}
      </div>

      <div className="filter-section">
        <SectionHeader left="Travel and Baggage" right="From" />
        {filterOptions.baggage.map(b => (
          <CheckRow
            key={b.value}
            label={b.label}
            price={b.price}
            checked={filters.baggage.includes(b.value)}
            onChange={() => dispatch(toggleBaggage(b.value))}
          />
        ))}
      </div>

      <div className="filter-section">
        <SectionHeader left="Departure Time" />
        <p className="range-label">
          {minutesToTime(filters.departureRange[0])} – {minutesToTime(filters.departureRange[1])}
        </p>
        <Slider
          range
          min={0}
          max={1439}
          value={[filters.departureRange[0], filters.departureRange[1]]}
          onChange={val => dispatch(setDepartureRange([val[0], val[1]]))}
          tooltip={{ formatter: val => val !== undefined ? minutesToTime(val) : '' }}
          styles={sliderStyles}
        />
      </div>

      <div className="filter-section">
        <SectionHeader left="Arrival Time" />
        <p className="range-label">
          {minutesToTime(filters.arrivalRange[0])} – {minutesToTime(filters.arrivalRange[1])}
        </p>
        <Slider
          range
          min={0}
          max={1439}
          value={[filters.arrivalRange[0], filters.arrivalRange[1]]}
          onChange={val => dispatch(setArrivalRange([val[0], val[1]]))}
          tooltip={{ formatter: val => val !== undefined ? minutesToTime(val) : '' }}
          styles={sliderStyles}
        />
      </div>

      <div className="filter-actions">
        <button
          onClick={() => dispatch(resetFilters())}
          className="filter-btn-reset"
        >
          Reset
        </button>
        <button className="filter-btn-apply">
          Apply Filters
        </button>
      </div>
    </aside>
  );
}
