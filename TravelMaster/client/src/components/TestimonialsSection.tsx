import { useEffect } from "react";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108755-2616b36b4d7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    text: "Wanderlust made our honeymoon in Paris absolutely magical. Every detail was perfect!",
    rating: 5
  },
  {
    id: 2,
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    text: "Amazing service and incredible destinations. The Tokyo trip exceeded all expectations!",
    rating: 5
  },
  {
    id: 3,
    name: "Emma Williams",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    text: "Professional guides, comfortable accommodations, and unforgettable memories. Highly recommended!",
    rating: 5
  },
  {
    id: 4,
    name: "David Rodriguez",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200",
    text: "The Bali adventure was incredible! Perfect blend of culture, nature, and relaxation.",
    rating: 5
  }
];

export default function TestimonialsSection() {
  useEffect(() => {
    // Initialize Swiper when available
    const initSwiper = () => {
      if (window.Swiper) {
        new window.Swiper('.testimonials-swiper', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
            delay: 5000,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
          breakpoints: {
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            }
          }
        });
      }
    };

    if (window.Swiper) {
      initSwiper();
    } else {
      const checkSwiper = setInterval(() => {
        if (window.Swiper) {
          initSwiper();
          clearInterval(checkSwiper);
        }
      }, 100);
    }
  }, []);

  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <i key={i} className="fas fa-star"></i>
    ));
  };

  return (
    <section id="about" className="testimonials-section section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">What Our Customers Say</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Real experiences from real travelers
        </p>
        
        <div className="swiper testimonials-swiper" data-aos="fade-up" data-aos-delay="200">
          <div className="swiper-wrapper">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="swiper-slide">
                <div className="testimonial-card">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="testimonial-avatar"
                  />
                  <div className="testimonial-text">"{testimonial.text}"</div>
                  <div className="testimonial-author">{testimonial.name}</div>
                  <div className="testimonial-rating">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-next"></div>
          <div className="swiper-button-prev"></div>
        </div>

        {/* Fallback grid for when Swiper is not available */}
        <div className="row g-4 d-none" id="testimonials-fallback">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="col-lg-3 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="testimonial-card">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="testimonial-avatar"
                />
                <div className="testimonial-text">"{testimonial.text}"</div>
                <div className="testimonial-author">{testimonial.name}</div>
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
