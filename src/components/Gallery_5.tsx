const galleryPhotos_5 = [
  '/optimized/26-w1600.webp',
  '/optimized/27-w1600.webp',
  '/optimized/28-w1600.webp',
  '/optimized/29-w1600.webp',
  '/optimized/30-w1600.webp',
];

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

export function Gallery_5() {
  return (
    <section className='gallery-section'>
      <div className='gallery-content'>
        <motion.h2
          className='gallery-title'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          At the Aisle
        </motion.h2>
        <motion.p
          className='gallery-description'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
        </motion.p>

        <motion.div
          className='h-[480px]'
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Swiper
            modules={[Autoplay, Pagination, EffectFade]}
            spaceBetween={5}
            slidesPerView={1.2}
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
        </motion.div>
      </div>
    </section>
  );
}
