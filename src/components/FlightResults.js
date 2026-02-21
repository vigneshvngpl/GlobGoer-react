import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import FlightCard from './FlightCard';
import './FlightResults.css';
import tabs from "../data/tabsData.json";

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

export default function FlightResults() {

  const [sortTab, setSortTab] = useState('recommended');
  const searchResults = useAppSelector(state => state.search.results);
  const searched = useAppSelector(state => state.search.searched);
  const filters = useAppSelector(state => state.filters);

  const filteredAndSorted = useMemo(() => {

    if (!searched) return [];

    const filtered = searchResults.filter(f => {

      if (filters.stops.length > 0) {
        const stopMatch = filters.stops.some(s =>
          s === 2 ? f.stops >= 2 : f.stops === s
        );
        if (!stopMatch) return false;
      }

      if (
        filters.airlines.length > 0 &&
        !filters.airlines.includes(f.airline)
      ) {
        return false;
      }

      if (
        filters.baggage.length > 0 &&
        !filters.baggage.every(b => f.baggage.includes(b))
      ) {
        return false;
      }

      const depMins = timeToMinutes(f.departure.time);
      if (
        depMins < filters.departureRange[0] ||
        depMins > filters.departureRange[1]
      ) {
        return false;
      }

      const arrMins = timeToMinutes(f.arrival.time);
      if (
        arrMins < filters.arrivalRange[0] ||
        arrMins > filters.arrivalRange[1]
      ) {
        return false;
      }

      return true;
    });

    return filtered.sort((a, b) => {

      if (sortTab === 'fastest')
        return a.durationMinutes - b.durationMinutes;

      if (sortTab === 'cheapest')
        return a.price - b.price;

      const scoreA = a.price / 1000 + a.durationMinutes / 60;
      const scoreB = b.price / 1000 + b.durationMinutes / 60;
      return scoreA - scoreB;
    });

  }, [filters, sortTab, searchResults, searched]);

  if (!searched) {
    return (
      <div className="flight-results">
        <div className="no-flights">
          <div className="no-flights-icon">✈️</div>
          <p className="no-flights-title">
            Select departure and destination to search flights
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flight-results">

      
      <div className="results-tabs">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setSortTab(tab.value)}
            className={`results-tab ${
              sortTab === tab.value ? 'results-tab--active' : ''
            }`}
          >
            <img
              src={tab.image}
              alt={tab.name}
              className="tab-icon"
            />
            <div>
              <div className="tab-label">{tab.label}</div>
              <div className="tab-price">{tab.price}</div>
            </div>
          </button>
        ))}
      </div>

      
      {filteredAndSorted.length === 0 ? (
        <div className="no-flights">
          <div className="no-flights-icon">✈️</div>
          <p className="no-flights-title">
            No flights match your filters
          </p>
          <p className="no-flights-sub">
            Try adjusting or resetting your filters
          </p>
        </div>
      ) : (
        <div>
          {filteredAndSorted.map(flight => (
            <FlightCard
              key={flight.id}
              flight={flight}
            />
          ))}
        </div>
      )}

    </div>
  );
}