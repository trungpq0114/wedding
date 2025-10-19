import { imageUrls } from '../constants';

const heroImages = [imageUrls.hero, imageUrls.hero1, imageUrls.hero2];

export function Hero() {
  return (
    <div className='hero-background'>
      <img
        src={heroImages[0]}
        alt={`Wedding Hero ${1}`}
        className='hero-bg-img'
      />
    </div>
  );
}
