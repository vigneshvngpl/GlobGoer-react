import React from 'react';
import './FlightCard.css';

const refundColor = {
  'Partially Refundable': 'refund-partial',
  'Non-refundable': 'refund-none',
  'Fully refundable': 'refund-full',
};

function RouteSegment({ departure, arrival, duration, date }) {
  return (
    <div className="route-segment">
      <p className="route-date">{date}</p>
      <div className="route-row">
        <div className="route-endpoint">
          <span className="route-time">{departure.time}</span>
          <span className="route-airport">{departure.airport}</span>
          <span className="route-city">{departure.city}</span>
        </div>

        <div className="route-line">
          <span className="route-duration">{duration}</span>
          <div className="route-track">
            <div className="route-dash"></div>
            <span className="route-plane">✈</span>
            <div className="route-dash"></div>
          </div>
        </div>

        <div className="route-endpoint route-endpoint--right">
          <span className="route-time">{arrival.time}</span>
          <span className="route-airport">{arrival.airport}</span>
          <span className="route-city">{arrival.city}</span>
        </div>
      </div>
    </div>
  );
}

export default function FlightCard({ flight }) {
  const {
    airline,
    travelClass,
    price,
    duration,
    refundable,
    seatsRemaining,
    departure,
    arrival,
    returnFlight,
    tags,
  } = flight;

  return (
    <div className="flight-card">
      <div className="flight-card-header">
        <div className="flight-airline">
          <div className="airline-icon">
  <img src="/FlightListing/logo.png" alt="airline" />
</div>
          <span className="airline-name">{airline}</span>
        </div>
        <span className="flight-class">
          Travel Class: <strong>{travelClass}</strong>
        </span>
      </div>

      <div className="flight-card-body">
        <div className="flight-routes">
          <RouteSegment
            departure={departure}
            arrival={arrival}
            duration={duration}
            date={departure.date}
          />
          {returnFlight && (
            <RouteSegment
              departure={returnFlight.departure}
              arrival={returnFlight.arrival}
              duration={duration}
              date={returnFlight.departure.date}
            />
          )}
        </div>

        <div className="flight-price-block">
          <span className="flight-price">${price.toLocaleString()}</span>
          <button className="flight-book-btn">Book Now</button>
        </div>
      </div>

      <div className="flight-card-footer">
        <span className="seats-remaining">{seatsRemaining} seats remaining</span>
        <span className={`refund-status ${refundColor[refundable]}`}>{refundable}</span>
        <button className="view-details-btn">View flight details</button>
      </div>

      {tags && tags.length > 0 && (
        <div className="flight-tags">
          {tags.map((tag, i) => (
            <span key={i} className="flight-tag">
              <span className="tag-icon">-</span> {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
