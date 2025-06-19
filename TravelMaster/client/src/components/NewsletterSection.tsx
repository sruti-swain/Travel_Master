import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setShowSuccess(true);
      setEmail('');
      setIsSubmitting(false);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);
    }, 1000);
  };

  return (
    <section className="newsletter-section section-padding" id="newsletter">
      <div className="container">
        <div className="text-center">
          <h2 className="section-title" style={{ color: 'white' }} data-aos="fade-up">Stay Updated</h2>
          <p className="section-subtitle" style={{ color: 'rgba(255,255,255,0.8)' }} data-aos="fade-up" data-aos-delay="100">
            Subscribe to our newsletter for exclusive deals and travel tips
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="200">
            <div className="row g-3">
              <div className="col-md-8">
                <input 
                  type="email" 
                  className="newsletter-input" 
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                  disabled={isSubmitting}
                />
              </div>
              <div className="col-md-4">
                <button 
                  type="submit" 
                  className="btn btn-light w-100" 
                  style={{ borderRadius: '50px', padding: '1rem' }}
                  disabled={isSubmitting}
                >
                  <i className={`fas ${isSubmitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'} me-2`}></i>
                  {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                </button>
              </div>
            </div>
          </form>
          
          {showSuccess && (
            <div className="alert alert-success mt-3" role="alert">
              <i className="fas fa-check-circle me-2"></i>
              Thank you for subscribing! You'll receive our latest deals and travel tips.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
