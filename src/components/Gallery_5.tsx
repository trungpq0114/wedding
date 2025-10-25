import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const galleryPhotos_5 = [
  '/optimized/26-w1600.webp',
  '/optimized/27-w1600.webp',
  '/optimized/28-w1600.webp',
  '/optimized/29-w1600.webp',
  '/optimized/30-w1600.webp',
];
export function Gallery_5() {
  return (
    <section className='gallery-section'>
      <div className='gallery-content'>
        <div className='h-[480px]'>
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            className='hero-swiper'
          >
            {galleryPhotos_5.map((image, index) => (
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
