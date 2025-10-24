import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const galleryPhotos_1 = [
  '/optimized/3-w1600.webp',
  '/optimized/4-w1600.webp',
  '/optimized/5-w1600.webp',
  '/optimized/6-w1600.webp',
  '/optimized/7-w1600.webp',
  '/optimized/8-w1600.webp',
  '/optimized/12-w1600.webp',
  '/optimized/13-w1600.webp',
  '/optimized/9-w1600.webp',
  '/optimized/10-w1600.webp',
  '/optimized/11-w1600.webp',
];

export function Gallery_1() {
  return (
    <section className='gallery-section'>
      <div className='gallery-content'>
        <h2 className='gallery-title'>Our Memories</h2>
        <p className='gallery-description'>
          This album captures the most beautiful moments of our special
          day—filled with love, joy, and unforgettable memories. From our
          heartfelt vows to the first dance, every photo tells a story of our
          journey together. Surrounded by family and friends, we celebrated a
          love that will last a lifetime.
        </p>

        <div className='h-[480px]'>
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            className='hero-swiper'
          >
            {galleryPhotos_1.map((image, index) => (
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
      </div>
    </section>
    
  );
}
