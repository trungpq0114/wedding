import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';

const galleryPhotos_1 = [
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
        <motion.h2
          className='gallery-title'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Hạnh phúc là khi có một người luôn chọn ta giữa muôn vàn lựa chọn. Là
          cái tựa nhẹ vào vai trong những lúc yếu lòng, là ánh mắt chỉ dành cho
          riêng ta dù thế giới ngoài kia rộng lớn.
        </motion.h2>
        <motion.p
          className='gallery-description'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        ></motion.p>

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
              delay: 3000,
              disableOnInteraction: false,
            }}
            className='hero-swiper'
          >
            {galleryPhotos_1.map((image, index) => (
              <SwiperSlide key={index}>
                <PhotoProvider>
                  <PhotoView src={image}>
                    <img
                      src={image}
                      alt={`Wedding Hero ${index + 1}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className='w-full h-full object-cover object-center block'
                    />
                  </PhotoView>
                </PhotoProvider>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
