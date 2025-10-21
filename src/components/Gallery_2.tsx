import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const galleryPhotos_2 = [
  { src: '/optimized/12-w1600.webp', caption: 'A toast to us' },
  { src: '/optimized/13-w1600.webp', caption: 'This is our love story' },
  { src: '/optimized/3-w1600.webp', caption: 'Our first hello' },
  { src: '/optimized/6-w1600.webp', caption: 'Laughter and vows' },
  { src: '/optimized/7-w1600.webp', caption: 'Quiet stolen moments' },
  { src: '/optimized/8-w1600.webp', caption: 'Sunset we remember' },
  { src: '/optimized/9-w1600.webp', caption: 'Hands held tight' },
  { src: '/optimized/10-w1600.webp', caption: 'A walk together' },
];

// Usage: import { GalleryAlt } from './components/GalleryAlt';
// Then include <GalleryAlt /> in your page or App component.
export function Gallery_2() {
  return (
    <section className="gallery-alt-section">
      <div className="gallery-alt-content">
        <div className='section-title text-center px-4 sm:px-6 md:px-8 mb-6 sm:mb-8 md:mb-10'>
          <h6 className='event-title uppercase text-sm sm:text-base md:text-lg mb-2'>Celebrate Our Love</h6>
          <h2 className='event-description text-xl sm:text-2xl md:text-3xl font-semibold'>Join Us as We Begin Our Forever</h2>
        </div>
    
  <div className="gallery-alt-wrapper" style={{ height: '80vh' }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCreative]}
            effect="creative"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            creativeEffect={{
              prev: {
                translate: [0, "-20%", -200],
                rotate: [0, 0, -5],
                scale: 0.9,
                opacity: 0.7,
              },
              next: {
                translate: [0, "20%", -200],
                rotate: [0, 0, 5],
                scale: 0.9,
                opacity: 0.7,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="gallery-alt-swiper"
          >
            {galleryPhotos_2.map((item, idx) => (
              <SwiperSlide key={idx} style={{ width: '100%' }}>
                <div className="slide-card w-full overflow-hidden relative" style={{ height: '80vh', maxHeight: '900px' }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover object-center block aspect-[3/4]"
                  />

                  {/* Top-right caption overlay: bold white text with strong white glow */}
                  <div
                    aria-hidden
                    className="absolute bottom-8 left-0 right-0 text-center px-4 sm:px-6 md:px-8"
                    style={{
                      background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)',
                      padding: '40px 14px 20px',
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.9)',
                        fontWeight: 600,
                        fontSize: 'clamp(18px, 5vw, 32px)',
                        display: 'inline-block',
                        lineHeight: 1.2,
                        letterSpacing: '0.5px',
                        textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                      }}
                    >
                      {item.caption}
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
