import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const galleryPhotos_6 = [
  '/optimized/58-w1600.webp',
  '/optimized/59-w1600.webp',
  '/optimized/60-w1600.webp',
  '/optimized/61-w1600.webp',
  '/optimized/62-w1600.webp',
  '/optimized/63-w1600.webp',
];

export function Gallery_6() {
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
            {galleryPhotos_6.map((image, index) => (
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
