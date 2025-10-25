import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css/effect-cards';

const galleryPhotos_2 = [
  '/optimized/58-w1600.webp',
  '/optimized/59-w1600.webp',
  '/optimized/60-w1600.webp',
  '/optimized/61-w1600.webp',
  '/optimized/62-w1600.webp',
  '/optimized/63-w1600.webp',
];

export function Gallery_2() {
  return (
    <section className='gallery-section'>
      <div className='gallery-content'>
        <div className='h-[480px] overflow-hidden'>
          <Swiper
            effect={'cards'}
            grabCursor={true}
            modules={[EffectCards]}
            className='w-[80%]'
          >
            {galleryPhotos_2.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`Wedding Hero ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  className='w-full h-full object-cover object-center block border-[4px] border-[#ededed]'
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
