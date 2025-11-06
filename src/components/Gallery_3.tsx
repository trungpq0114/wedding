const galleryPhotos_3 = [
  '/optimized/15-w1600.webp',
  '/optimized/16-w1600.webp',
  '/optimized/18-w1600.webp',
  '/optimized/19-w1600.webp',
  '/optimized/20-w1600.webp',
  '/optimized/21-w1600.webp',
  '/optimized/23-w1600.webp',
  '/optimized/24-w1600.webp',
  '/optimized/25-w1600.webp',
  '/optimized/42-w1600.webp',
  '/optimized/41-w1600.webp',
  '/optimized/40-w1600.webp',
  '/optimized/38-w1600.webp',
  '/optimized/37-w1600.webp',
  '/optimized/36-w1600.webp',
  '/optimized/35-w1600.webp',
  '/optimized/34-w1600.webp',
  '/optimized/33-w1600.webp',
  '/optimized/32-w1600.webp',
  '/optimized/26-w1600.webp',
  '/optimized/27-w1600.webp',
  '/optimized/28-w1600.webp',
  '/optimized/30-w1600.webp',
];

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { PhotoProvider, PhotoView } from 'react-photo-view';

export function Gallery_3() {
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
          Em mong rằng, tình yêu của chúng ta không chỉ là những lời hứa lãng
          mạn khi còn trẻ, mà sẽ được vun đắp bởi những ngày sau mình vẫn còn
          thương nhau. Là những cái nắm tay thật chặt giữa trời đông lạnh giá,
          là những cái ôm từ phía sau khi em bỗng dưng thấy lòng trống trải, 
          là những lần em cẩn thận sửa lại khăn choàng cổ cho anh trước khi cả hai cùng bước ra đường.
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
              delay: 2000,
              disableOnInteraction: false,
            }}
            className='hero-swiper'
          >
            {galleryPhotos_3.map((image, index) => (
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
