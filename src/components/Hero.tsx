import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { imageUrls } from '../constants';

const heroImages = [imageUrls.hero, imageUrls.hero1, imageUrls.hero2];

export function Hero() {
  return (
    <div className='hero-background'>
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        className='hero-swiper'
      >
        {heroImages.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Wedding Hero ${index + 1}`}
              loading={index === 0 ? 'eager' : 'lazy'}
              className='w-full h-full object-cover object-center block'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
