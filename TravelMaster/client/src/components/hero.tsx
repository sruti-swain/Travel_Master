import { useEffect, useRef } from "react";
import SearchWidget from "./search-widget";

export default function Hero() {
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const video = heroVideoRef.current;
      if (video) {
        const speed = scrolled * 0.5;
        video.style.transform = `translateY(${speed}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleExploreClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    button.appendChild(ripple);
    
    setTimeout(() => {
      ripple.remove();
    }, 600);

    // Scroll to destinations section
    const destinationsSection = document.getElementById('destinations');
    if (destinationsSection) {
      destinationsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero-section">
      <video
        ref={heroVideoRef}
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="container">
        <div className="hero-content" data-aos="fade-up">
          <h1 className="hero-title">Find Your Next Adventure</h1>
          <p className="hero-subtitle">Discover amazing destinations around the world</p>
          <button
            className="btn btn-primary-custom"
            onClick={handleExploreClick}
          >
            <i className="fas fa-compass me-2"></i>Explore Now
          </button>
          
          <SearchWidget />
        </div>
      </div>
    </section>
  );
}
