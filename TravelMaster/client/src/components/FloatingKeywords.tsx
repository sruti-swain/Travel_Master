import { useEffect, useRef } from "react";

const keywords = [
  'Adventure', 'Explore', 'Discover', 'Journey', 'Wanderlust', 'Travel', 'Vacation', 
  'Paradise', 'Destination', 'Experience', 'Culture', 'Nature', 'Mountains', 'Beach',
  'City', 'Safari', 'Temple', 'Ocean', 'Forest', 'Desert', 'Island', 'Heritage',
  'Luxury', 'Budget', 'Family', 'Solo', 'Romance', 'Backpacking', 'Cruise'
];

export default function FloatingKeywords() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let mouseX = 0;
    let mouseY = 0;

    function createKeyword() {
      if (!container) return;
      
      const keyword = document.createElement('div');
      keyword.className = 'keyword';
      keyword.textContent = keywords[Math.floor(Math.random() * keywords.length)];
      keyword.style.left = Math.random() * 100 + '%';
      keyword.style.animationDelay = Math.random() * 2 + 's';
      keyword.style.animationDuration = (Math.random() * 10 + 10) + 's';
      container.appendChild(keyword);
      
      setTimeout(() => {
        if (keyword.parentNode) {
          keyword.remove();
        }
      }, 20000);
    }

    // Create keywords periodically
    const keywordInterval = setInterval(createKeyword, 2000);

    // Mouse tracking for blur effect
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Apply blur effect to nearby keywords
      const keywords = container?.querySelectorAll('.keyword');
      keywords?.forEach(keyword => {
        const rect = keyword.getBoundingClientRect();
        const distance = Math.sqrt(
          Math.pow(mouseX - (rect.left + rect.width / 2), 2) + 
          Math.pow(mouseY - (rect.top + rect.height / 2), 2)
        );
        
        if (distance < 150) {
          (keyword as HTMLElement).style.filter = `blur(${Math.max(0, 150 - distance) / 30}px)`;
        } else {
          (keyword as HTMLElement).style.filter = 'none';
        }
      });
    }

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(keywordInterval);
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <div ref={containerRef} className="floating-keywords" />;
}
