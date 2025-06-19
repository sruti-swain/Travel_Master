import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function SearchWidget() {
  const [searchData, setSearchData] = useState({
    destination: '',
    date: '',
    type: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchData.destination || !searchData.date || !searchData.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all search fields",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Search Started",
      description: `Searching for ${searchData.type} packages to ${searchData.destination}`,
    });

    // Scroll to destinations section
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="search-widget" data-aos="fade-up" data-aos-delay="200">
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label">Destination</label>
            <select
              className="form-control"
              value={searchData.destination}
              onChange={(e) => setSearchData({ ...searchData, destination: e.target.value })}
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
              value={searchData.date}
              onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Travel Type</label>
            <select
              className="form-control"
              value={searchData.type}
              onChange={(e) => setSearchData({ ...searchData, type: e.target.value })}
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
