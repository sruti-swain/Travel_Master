import { useEffect, useState } from "react";

const KEYWORDS = [
  'Adventure', 'Explore', 'Discover', 'Journey', 'Wanderlust', 'Travel', 'Vacation', 
  'Paradise', 'Destination', 'Experience', 'Culture', 'Nature', 'Mountains', 'Beach',
  'City', 'Safari', 'Temple', 'Ocean', 'Forest', 'Desert', 'Island', 'Heritage',
  'Luxury', 'Budget', 'Family', 'Solo', 'Romance', 'Backpacking', 'Cruise'
];

interface Keyword {
  id: string;
  text: string;
  x: number;
  delay: number;
  duration: number;
}

export default function FloatingKeywords() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const createKeyword = () => {
      const keyword: Keyword = {
        id: Math.random().toString(36).substr(2, 9),
        text: KEYWORDS[Math.floor(Math.random() * KEYWORDS.length)],
        x: Math.random() * 100,
        delay: Math.random() * 2,
        duration: Math.random() * 10 + 10
      };
      
      setKeywords(prev => [...prev, keyword]);
      
      // Remove keyword after animation completes
      setTimeout(() => {
        setKeywords(prev => prev.filter(k => k.id !== keyword.id));
      }, (keyword.duration + keyword.delay) * 1000);
    };

    // Create keywords periodically
    const interval = setInterval(createKeyword, 2000);
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const calculateBlur = (keywordElement: HTMLElement | null) => {
    if (!keywordElement) return 0;
    
    const rect = keywordElement.getBoundingClientRect();
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - (rect.left + rect.width / 2), 2) + 
      Math.pow(mousePosition.y - (rect.top + rect.height / 2), 2)
    );
    
    return distance < 150 ? Math.max(0, 150 - distance) / 30 : 0;
  };

  return (
    <div className="floating-keywords">
      {keywords.map(keyword => (
        <div
          key={keyword.id}
          className="keyword"
          style={{
            left: `${keyword.x}%`,
            animationDelay: `${keyword.delay}s`,
            animationDuration: `${keyword.duration}s`,
            filter: `blur(${calculateBlur(null)}px)`
          }}
        >
          {keyword.text}
        </div>
      ))}
    </div>
  );
}
