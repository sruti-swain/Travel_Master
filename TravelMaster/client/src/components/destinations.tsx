import { useQuery } from "@tanstack/react-query";
import type { Destination } from "@shared/schema";

export default function Destinations() {
  const { data: destinations, isLoading, error } = useQuery<Destination[]>({
    queryKey: ['/api/destinations'],
  });

  if (isLoading) {
    return (
      <section id="destinations" className="section-padding">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="row g-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="destination-card">
                  <div className="bg-gray-200 animate-pulse" style={{ height: '250px' }}></div>
                  <div className="card-body">
                    <div className="bg-gray-200 animate-pulse h-4 mb-2"></div>
                    <div className="bg-gray-200 animate-pulse h-6 mb-2"></div>
                    <div className="bg-gray-200 animate-pulse h-4 mb-2"></div>
                    <div className="bg-gray-200 animate-pulse h-4"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="destinations" className="section-padding">
        <div className="container">
          <h2 className="section-title">Popular Destinations</h2>
          <div className="text-center">
            <p className="text-danger">Failed to load destinations. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="destinations" className="section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Popular Destinations</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Explore the world's most beautiful places
        </p>
        
        <div className="row g-4">
          {destinations?.map((destination, index) => (
            <div key={destination.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="card destination-card">
                <img
                  src={destination.imageUrl}
                  alt={destination.name}
                  className="card-img-top"
                  loading="lazy"
                />
                <div className="card-body">
                  <div className="destination-rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < Math.floor(parseFloat(destination.rating)) ? '' : 'text-muted'}`}
                      ></i>
                    ))}
                    <span className="ms-1">{destination.rating}</span>
                  </div>
                  <h5 className="card-title">{destination.name}</h5>
                  <p className="card-text">{destination.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="destination-price">From ${destination.price}</span>
                    <small className="text-muted">{destination.duration}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
