import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import type { Testimonial } from "@shared/schema";

export default function Testimonials() {
  const swiperRef = useRef<HTMLDivElement>(null);

  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  useEffect(() => {
    if (!testimonials || testimonials.length === 0) return;

    // Initialize Swiper when testimonials are loaded
    if (typeof window !== 'undefined' && (window as any).Swiper && swiperRef.current) {
      const Swiper = (window as any).Swiper;
      
      new Swiper(swiperRef.current, {
        slidesPerView: 1,
        spaceBetween: 30,
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
          1024: {
            slidesPerView: 3,
          },
        },
        effect: 'fade',
        fadeEffect: {
          crossFade: true
        }
      });
    }
  }, [testimonials]);

  if (isLoading) {
    return (
      <section className="testimonials-section section-padding">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="row g-4">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="col-lg-4 col-md-6">
                <div className="testimonial-card">
                  <div className="bg-gray-200 animate-pulse testimonial-avatar mx-auto mb-3"></div>
                  <div className="bg-gray-200 animate-pulse h-4 mb-2"></div>
                  <div className="bg-gray-200 animate-pulse h-4 mb-2"></div>
                  <div className="bg-gray-200 animate-pulse h-4 mb-2"></div>
                  <div className="bg-gray-200 animate-pulse h-4"></div>
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
      <section className="testimonials-section section-padding">
        <div className="container">
          <h2 className="section-title">What Our Customers Say</h2>
          <div className="text-center">
            <p className="text-danger">Failed to load testimonials. Please try again later.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="testimonials-section section-padding">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">What Our Customers Say</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Real experiences from real travelers
        </p>
        
        <div className="swiper" ref={swiperRef} data-aos="fade-up" data-aos-delay="200">
          <div className="swiper-wrapper">
            {testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="testimonial-avatar"
                    loading="lazy"
                  />
                  <div className="testimonial-text">
                    "{testimonial.text}"
                  </div>
                  <div className="testimonial-author">{testimonial.name}</div>
                  <div className="testimonial-rating">
                    {[...Array(5)].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${i < testimonial.rating ? '' : 'text-muted'}`}
                      ></i>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </div>
      </div>
    </section>
  );
}
