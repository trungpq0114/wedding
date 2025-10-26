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


import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';

export function Gallery_4() {
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
          The Vow Ceremony
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
            spaceBetween={30}
            slidesPerView={1.2}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
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
        </motion.div>
      </div>
    </section>
  );
}
