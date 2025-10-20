import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

// Extended album photos
export const albumPhotos = [
  '/optimized/58-w1600.webp',
  '/optimized/59-w1600.webp',
  '/optimized/60-w1600.webp',
  '/optimized/61-w1600.webp',
  '/optimized/62-w1600.webp',
  '/optimized/63-w1600.webp',
];

export function Album() {
  return (
    <section className='!mt-10'>
      <div className='container mx-auto px-4'>
        <div className='section-title text-center'>
          <h6 className='event-title uppercase'>Celebrate Our Love</h6>
          <h2 className='event-description'>Join Us as We Begin Our Forever</h2>
        </div>

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
            {albumPhotos.map((image, index) => (
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
