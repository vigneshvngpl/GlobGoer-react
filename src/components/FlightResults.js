import React, { useState, useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import FlightCard from './FlightCard';
import flightData from '../data/flights.json';
import './FlightResults.css';

const allFlights = flightData.flights;

function timeToMinutes(time) {
  const [h, m] = time.split(':').map(Number);
  return h * 60 + m;
}

const tabs = [
  { label: 'Recommended', image: 'FlightListing/recomended.png', price: '$500 - 10h 20m', value: 'recommended' },
  { label: 'Fastest',     image: 'FlightListing/Fastest.png', price: '$500 - 10h 20m', value: 'fastest'     },
  { label: 'Cheapest',    image: 'FlightListing/Cheapest.png', price: '$500 - 10h 20m', value: 'cheapest'    },
];

export default function FlightResults() {
  const [sortTab, setSortTab] = useState('recommended');
  const filters = useAppSelector(state => state.filters);

  const filteredAndSorted = useMemo(() => {
    let result = [...allFlights];

    if (filters.stops.length > 0) {
      result = result.filter(f =>
        filters.stops.some(s => {
          if (s === 'nonstop') return f.stops === 0;
          if (s === '1stop')   return f.stops === 1;
          if (s === '2plus')   return f.stops >= 2;
          return false;
        })
      );
    }

    if (filters.airlines.length > 0) {
      result = result.filter(f => filters.airlines.includes(f.airline));
    }

    if (filters.baggage.length > 0) {
      result = result.filter(f =>
        filters.baggage.every(b => f.baggage.includes(b))
      );
    }

    result = result.filter(f => {
      const mins = timeToMinutes(f.departure.time);
      return mins >= filters.departureRange[0] && mins <= filters.departureRange[1];
    });

    result = result.filter(f => {
      const mins = timeToMinutes(f.arrival.time);
      return mins >= filters.arrivalRange[0] && mins <= filters.arrivalRange[1];
    });

    if (sortTab === 'fastest') {
      result.sort((a, b) => a.durationMinutes - b.durationMinutes);
    } else if (sortTab === 'cheapest') {
      result.sort((a, b) => a.price - b.price);
    } else {
      result.sort((a, b) => {
        const scoreA = a.price / 1000 + a.durationMinutes / 60;
        const scoreB = b.price / 1000 + b.durationMinutes / 60;
        return scoreA - scoreB;
      });
    }

    return result;
  }, [filters, sortTab]);

  return (
    <div className="flight-results">
      <div className="results-tabs">
        {tabs.map(tab => (
          <button
            key={tab.value}
            onClick={() => setSortTab(tab.value)}
            className={`results-tab ${sortTab === tab.value ? 'results-tab--active' : ''}`}
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
          <p className="no-flights-title">No flights match your filters</p>
          <p className="no-flights-sub">Try adjusting or resetting your filters</p>
        </div>
      ) : (
        <div>
          {filteredAndSorted.map(flight => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </div>
      )}
    </div>
  );
}
