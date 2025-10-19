import { useEffect, useState } from 'react';
import { imageUrls } from '../constants';

const heroImages = [imageUrls.hero, imageUrls.hero1, imageUrls.hero2];

export function Hero() {
  const [heroImageIndex, setHeroImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='hero-background'>
      {heroImages.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Wedding Hero ${index + 1}`}
          className={`hero-bg-img ${index === heroImageIndex ? 'opacity-100' : 'opacity-0'}`}
          style={{
            transition: 'opacity 1s ease-in-out',
            position: index === 0 ? 'relative' : 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        />
      ))}
    </div>
  );
}
