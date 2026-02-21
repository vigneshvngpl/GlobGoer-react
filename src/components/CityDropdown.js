import React, { useState, useRef, useEffect } from 'react';
import cityData from '../data/Citydata ';
import './CityDropdown.css';

export default function CityDropdown({ placeholder, icon, value, onChange }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  const filtered = query.trim()
    ? cityData.filter(
        (c) =>
          c.city.toLowerCase().includes(query.toLowerCase()) ||
          c.airport.toLowerCase().includes(query.toLowerCase()) ||
          c.code.toLowerCase().includes(query.toLowerCase())
      )
    : cityData;

  useEffect(() => {
    const handler = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (item) => {
    onChange(item);
    setQuery(item.city);
    setOpen(false);
  };

  const handleInput = (e) => {
    setQuery(e.target.value);
    onChange(null);
    setOpen(true);
  };

  const displayValue = value ? value.city : query;

  return (
    <div className="searchbar-input-wrap city-dropdown-wrap" ref={wrapRef}>
      <img src={icon} alt="icon" className="searchbar-icon" />

      <input
        type="text"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleInput}
        onFocus={() => setOpen(true)}
        className="searchbar-input"
        autoComplete="off"
      />

      {open && filtered.length > 0 && (
        <ul className="city-suggestions">
          {filtered.map((item) => (
            <li
              key={item.code}
              className="city-suggestion-item"
              onMouseDown={() => handleSelect(item)}
            >
              <div className="city-suggestion-main">
                <span className="city-name">{item.city}</span>
                <span className="city-code">{item.code}</span>
              </div>
              <div className="city-airport">{item.airport}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}