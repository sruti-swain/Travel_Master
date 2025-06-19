import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav className={`navbar navbar-expand-lg navbar-light fixed-top navbar-custom ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container">
        <a className="navbar-brand" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
          <i className="fas fa-plane"></i> Wanderlust
        </a>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('destinations'); }}>
                Destinations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('packages'); }}>
                Packages
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
