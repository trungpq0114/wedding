import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';

const galleryPhotos_4 = [
  '/optimized/42-w1600.webp',
  '/optimized/41-w1600.webp',
  '/optimized/40-w1600.webp',
  '/optimized/39-w1600.webp',
  '/optimized/38-w1600.webp',
  '/optimized/37-w1600.webp',
  '/optimized/36-w1600.webp',
  '/optimized/35-w1600.webp',
  '/optimized/34-w1600.webp',
  '/optimized/33-w1600.webp',
  '/optimized/32-w1600.webp',
  '/optimized/31-w1600.webp',
];

export function Gallery_4() {
  return (
    <section className='gallery-section'>
      <div className='gallery-content px-4 sm:px-6 md:px-8'>
        <h2 className='gallery-title text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4'>Love</h2>
        <p className='gallery-description text-sm sm:text-base md:text-lg mb-6 sm:mb-8'>
            This album preserves the magic of our wedding day — a celebration of
            love, laughter, and precious memories. Every smile, every glance, and
            every embrace reflects the happiness we shared. From the moment we said
            "I do" to the joy on the dance floor, these photos tell the story of our
            hearts becoming one.
        </p>

        <div className='h-[300px] sm:h-[400px] md:h-[480px]'>
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={15}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 1.1,
                spaceBetween: 20
              },
              768: {
                slidesPerView: 1.2,
                spaceBetween: 30
              }
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className='hero-swiper'
          >
            {galleryPhotos_4.map((image, index) => (
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
