const destinations = [
  {
    id: 1,
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898536-47ad22581b52?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.8,
    description: "City of lights and romance, featuring iconic landmarks and world-class cuisine.",
    price: "From $1,299",
    duration: "7 days"
  },
  {
    id: 2,
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.9,
    description: "Modern metropolis blending ancient traditions with cutting-edge technology.",
    price: "From $1,599",
    duration: "10 days"
  },
  {
    id: 3,
    name: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.7,
    description: "Stunning island paradise with white-washed buildings and breathtaking sunsets.",
    price: "From $999",
    duration: "5 days"
  },
  {
    id: 4,
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.6,
    description: "Tropical paradise with pristine beaches, lush rice terraces, and rich culture.",
    price: "From $799",
    duration: "8 days"
  },
  {
    id: 5,
    name: "Machu Picchu, Peru",
    image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.8,
    description: "Ancient Incan citadel perched high in the Andes mountains.",
    price: "From $1,199",
    duration: "6 days"
  },
  {
    id: 6,
    name: "Maldives",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    rating: 4.9,
    description: "Luxury overwater villas in crystal-clear turquoise waters.",
    price: "From $2,499",
    duration: "7 days"
  }
];

export default function DestinationsSection() {
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className={`fas fa-star ${i < Math.floor(rating) ? '' : 'text-muted'}`}></i>
    ));
  };

  return (
    <section id="destinations" className="section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Popular Destinations</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Explore the world's most beautiful places
        </p>
        
        <div className="row g-4">
          {destinations.map((destination, index) => (
            <div key={destination.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="card destination-card">
                <img 
                  src={destination.image} 
                  alt={destination.name}
                  className="card-img-top"
                />
                <div className="card-body">
                  <div className="destination-rating">
                    {renderStars(destination.rating)}
                    <span className="ms-1">{destination.rating}</span>
                  </div>
                  <h5 className="card-title">{destination.name}</h5>
                  <p className="card-text">{destination.description}</p>
                  <div className="d-flex justify-content-between">
                    <span className="destination-price">{destination.price}</span>
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
