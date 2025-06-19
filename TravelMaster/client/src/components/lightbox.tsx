import { useState, useEffect } from "react";

interface LightboxProps {
  isOpen: boolean;
  imageSrc: string;
  imageAlt: string;
  onClose: () => void;
}

export default function Lightbox() {
  const [lightboxData, setLightboxData] = useState<{
    isOpen: boolean;
    imageSrc: string;
    imageAlt: string;
  }>({
    isOpen: false,
    imageSrc: '',
    imageAlt: ''
  });

  useEffect(() => {
    const handleGalleryClick = (event: Event) => {
      const target = event.target as HTMLElement;
      const galleryItem = target.closest('.gallery-item');
      
      if (galleryItem) {
        const img = galleryItem.querySelector('img');
        if (img) {
          setLightboxData({
            isOpen: true,
            imageSrc: img.src,
            imageAlt: img.alt
          });
          document.body.style.overflow = 'hidden';
        }
      }
    };

    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
      item.addEventListener('click', handleGalleryClick);
    });

    return () => {
      galleryItems.forEach(item => {
        item.removeEventListener('click', handleGalleryClick);
      });
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && lightboxData.isOpen) {
        closeLightbox();
      }
    };

    if (lightboxData.isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxData.isOpen]);

  const closeLightbox = () => {
    setLightboxData({
      isOpen: false,
      imageSrc: '',
      imageAlt: ''
    });
    document.body.style.overflow = 'auto';
  };

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      closeLightbox();
    }
  };

  if (!lightboxData.isOpen) return null;

  return (
    <div
      className="lightbox"
      style={{ display: 'flex' }}
      onClick={handleBackdropClick}
    >
      <span className="lightbox-close" onClick={closeLightbox}>
        &times;
      </span>
      <img
        src={lightboxData.imageSrc}
        alt={lightboxData.imageAlt}
        loading="lazy"
      />
    </div>
  );
}
