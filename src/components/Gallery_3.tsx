const galleryPhotos_3 = [
  '/optimized/41-w1600.webp',
  '/optimized/33-w1600.webp',
  '/optimized/19-w1600.webp',
  '/optimized/42-w1600.webp',
  '/optimized/28-w1600.webp',
  '/optimized/21-w1600.webp',
  '/optimized/37-w1600.webp',
  '/optimized/16-w1600.webp',
  '/optimized/24-w1600.webp',
  '/optimized/40-w1600.webp',
  '/optimized/18-w1600.webp',
  '/optimized/27-w1600.webp',
  '/optimized/26-w1600.webp',
  '/optimized/25-w1600.webp',
  '/optimized/35-w1600.webp',
  '/optimized/32-w1600.webp',
  '/optimized/36-w1600.webp',
  '/optimized/15-w1600.webp',
  '/optimized/30-w1600.webp',
  '/optimized/23-w1600.webp',
  '/optimized/38-w1600.webp',
  '/optimized/34-w1600.webp',
  '/optimized/20-w1600.webp',
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
          Tình yêu lớn nhất chính là sự kiên nhẫn chờ nhau trưởng thành, 
          là chấp nhận những thiếu sót của nhau, 
          là nhìn thấy những điều không hoàn hảo nhưng vẫn thương trọn vẹn. 
          Tình yêu là khi cả hai đều hiểu rằng, hôn nhân không phải lúc nào
          cũng là những ngày đẹp trời, nhưng chỉ cần đồng lòng, chỉ cần luôn tử
          tế với nhau, thì dù có đi qua bao nhiêu năm tháng, ta vẫn sẽ tìm thấy
          nhau ở nơi bình yên nhất của cuộc đời.
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
