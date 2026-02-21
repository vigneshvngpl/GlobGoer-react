import React from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterSidebar from './components/FilterSidebar';
import FlightResults from './components/FlightResults';
import RightSidebar from './components/RightSidebar';
import './App.css';

function App() {
  return (
    <main>
      <Header />
      <SearchBar />
      <div className="main-content">
        <FilterSidebar />
        <FlightResults />
        <RightSidebar />
      </div>
    </main>
  );
}

export default App;
