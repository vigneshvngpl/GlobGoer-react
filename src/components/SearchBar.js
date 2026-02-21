import React, { useState } from 'react';
import './SearchBar.css';

export default function SearchBar() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  return (
    <section className="searchbar">
      <div className="searchbar-top">
        <select className="searchbar-select">
          <option value="">Select flight</option>
          <option value="one-way">One Way</option>
          <option value="round">Round Trip</option>
          <option value="multi">Multi City</option>
        </select>
        <select className="searchbar-select">
          <option value="">Select Class</option>
          <option value="economy">Economy</option>
          <option value="business">Business</option>
          <option value="first">First Class</option>
        </select>
        <select className="searchbar-select">
          <option value="">Select Trip</option>
          <option value="domestic">Domestic</option>
          <option value="international">International</option>
        </select>
      </div>

      <div className="searchbar-bottom">
        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/from.png"
            alt="search icon"
            className="searchbar-icon"
          />
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={e => setFrom(e.target.value)}
            className="searchbar-input"
          />
        </div>

        <button className="searchbar-swap">
           <img
            src="/SearchBar/swap.png"
            alt="search icon"
            className="searchbar-icon"
          />
        </button>

        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/to.png"
            alt="search icon"
            className="searchbar-icon"
          />
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={e => setTo(e.target.value)}
            className="searchbar-input"
          />
        </div>

        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/date.png"
            alt="search icon"
            className="searchbar-icon"
          />
          <input
            type="text"
            placeholder="Departing - Returning"
            className="searchbar-input"
          />
        </div>

        <div className="searchbar-input-wrap">
          <img
            src="/SearchBar/passengers.png"
            alt="search icon"
            className="searchbar-icon"
          />
          <input
            type="text"
            placeholder="Travellers"
            className="searchbar-input"
          />
        </div>

        <button className="searchbar-search-btn">
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
