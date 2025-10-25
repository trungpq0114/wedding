import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const galleryPhotos_3 = [
  '/optimized/15-w1600.webp',
  '/optimized/16-w1600.webp',
  '/optimized/17-w1600.webp',
  '/optimized/18-w1600.webp',
  '/optimized/19-w1600.webp',
  '/optimized/20-w1600.webp',
  '/optimized/21-w1600.webp',
  '/optimized/22-w1600.webp',
  '/optimized/23-w1600.webp',
  '/optimized/24-w1600.webp',
  '/optimized/25-w1600.webp',
];
export function Gallery_3() {
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
            {galleryPhotos_3.map((image, index) => (
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
