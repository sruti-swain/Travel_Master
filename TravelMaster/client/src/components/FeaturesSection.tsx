const features = [
  {
    icon: "fas fa-dollar-sign",
    title: "Affordable Prices",
    description: "Best deals and competitive prices for all destinations worldwide."
  },
  {
    icon: "fas fa-headset",
    title: "24/7 Support",
    description: "Round-the-clock customer support for all your travel needs."
  },
  {
    icon: "fas fa-shield-alt",
    title: "Verified Packages",
    description: "All our travel packages are verified and quality assured."
  },
  {
    icon: "fas fa-map-marked-alt",
    title: "Expert Guides",
    description: "Professional local guides to enhance your travel experience."
  }
];

export default function FeaturesSection() {
  return (
    <section id="packages" className="features-section section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Why Choose Wanderlust</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Your perfect travel companion
        </p>
        
        <div className="row g-4">
          {features.map((feature, index) => (
            <div key={index} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="feature-card">
                <div className="feature-icon">
                  <i className={feature.icon}></i>
                </div>
                <h5>{feature.title}</h5>
                <p>{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
