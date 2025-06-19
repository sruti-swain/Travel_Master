import { useState } from "react";

const GALLERY_IMAGES = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Northern Lights"
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "African Safari"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Mountain Lake"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Ancient Temple"
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Coral Reef"
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1464822759844-d150baec843a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Snow Mountain"
  }
];

interface GalleryProps {
  onImageClick: (src: string, alt: string) => void;
}

export default function Gallery({ onImageClick }: GalleryProps = { onImageClick: () => {} }) {
  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Travel Gallery</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Moments captured from our adventures
        </p>
        
        <div className="row g-4">
          {GALLERY_IMAGES.map((image, index) => (
            <div key={image.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div 
                className="gallery-item"
                onClick={() => onImageClick(image.src, image.alt)}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                />
                <div className="gallery-overlay">
                  <i className="fas fa-search-plus"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
