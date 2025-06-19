export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="row g-4">
          <div className="col-lg-4 col-md-6">
            <h5 className="mb-3">
              <i className="fas fa-plane me-2"></i>Wanderlust Travel
            </h5>
            <p className="mb-3">
              Your trusted partner for unforgettable travel experiences around the world. 
              We create memories that last a lifetime.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6">
            <h6 className="mb-3">Quick Links</h6>
            <div className="footer-links">
              <a href="#" className="d-block mb-2" onClick={() => scrollToSection('home')}>
                Home
              </a>
              <a href="#" className="d-block mb-2" onClick={() => scrollToSection('destinations')}>
                Destinations
              </a>
              <a href="#" className="d-block mb-2" onClick={() => scrollToSection('packages')}>
                Packages
              </a>
              <a href="#" className="d-block mb-2" onClick={() => scrollToSection('about')}>
                About Us
              </a>
              <a href="#" className="d-block mb-2" onClick={() => scrollToSection('contact')}>
                Contact
              </a>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-3">Services</h6>
            <div className="footer-links">
              <a href="#" className="d-block mb-2">Flight Booking</a>
              <a href="#" className="d-block mb-2">Hotel Reservation</a>
              <a href="#" className="d-block mb-2">Car Rental</a>
              <a href="#" className="d-block mb-2">Travel Insurance</a>
              <a href="#" className="d-block mb-2">Visa Assistance</a>
            </div>
          </div>
          
          <div className="col-lg-3 col-md-6">
            <h6 className="mb-3">Contact Info</h6>
            <div className="footer-links">
              <p className="mb-2">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Travel Street, Adventure City, AC 12345
              </p>
              <p className="mb-2">
                <i className="fas fa-phone me-2"></i>
                +1 (555) 123-4567
              </p>
              <p className="mb-2">
                <i className="fas fa-envelope me-2"></i>
                info@wanderlusttravel.com
              </p>
            </div>
          </div>
        </div>
        
        <hr className="my-4" style={{ borderColor: '#475569' }} />
        
        <div className="text-center">
          <p className="mb-0">
            &copy; 2024 Wanderlust Travel. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
}
