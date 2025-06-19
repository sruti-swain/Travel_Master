import { useState } from "react";

export default function SearchWidget() {
  const [destination, setDestination] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [travelType, setTravelType] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Searching for ${travelType} packages to ${destination} starting from ${checkInDate}`);
  };

  return (
    <div className="search-widget" data-aos="fade-up" data-aos-delay="200">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Destination</label>
            <select 
              className="form-control" 
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            >
              <option value="">Choose destination...</option>
              <option value="paris">Paris, France</option>
              <option value="tokyo">Tokyo, Japan</option>
              <option value="newyork">New York, USA</option>
              <option value="london">London, UK</option>
              <option value="santorini">Santorini, Greece</option>
              <option value="bali">Bali, Indonesia</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">Check-in Date</label>
            <input 
              type="date" 
              className="form-control"
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Travel Type</label>
            <select 
              className="form-control"
              value={travelType}
              onChange={(e) => setTravelType(e.target.value)}
              required
            >
              <option value="">Select type...</option>
              <option value="adventure">Adventure</option>
              <option value="relaxation">Relaxation</option>
              <option value="culture">Culture</option>
              <option value="business">Business</option>
            </select>
          </div>
        </div>
        <div className="text-center mt-3">
          <button type="submit" className="btn btn-primary-custom">
            <i className="fas fa-search me-2"></i>Search Packages
          </button>
        </div>
      </form>
    </div>
  );
}
