import { useState } from "react";

const galleryImages = [
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
    src: "https://images.unsplash.com/photo-1464822759844-d150f76b1946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
    alt: "Snow Mountain"
  }
];

interface GallerySectionProps {
  onImageClick: (src: string, alt: string) => void;
}

export default function GallerySection({ onImageClick }: GallerySectionProps = { onImageClick: () => {} }) {
  const handleImageClick = (image: typeof galleryImages[0]) => {
    // Dispatch custom event for lightbox
    const event = new CustomEvent('openLightbox', {
      detail: { src: image.src, alt: image.alt }
    });
    window.dispatchEvent(event);
  };

  return (
    <section className="section-padding" id="gallery">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">Travel Gallery</h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
          Moments captured from our adventures
        </p>
        
        <div className="row g-4">
          {galleryImages.map((image, index) => (
            <div key={image.id} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={200 + index * 100}>
              <div className="gallery-item" onClick={() => handleImageClick(image)}>
                <img src={image.src} alt={image.alt} />
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
