import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCreative } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-creative';

const galleryPhotos_3 = [
  { src: '/optimized/14-w1600.webp', caption: 'Our journey begins' },
  { src: '/optimized/15-w1600.webp', caption: 'Forever starts here' },
  { src: '/optimized/16-w1600.webp', caption: 'Sweet memories' },
  { src: '/optimized/17-w1600.webp', caption: 'Love and laughter' },
  { src: '/optimized/18-w1600.webp', caption: 'Together forever' },
  { src: '/optimized/19-w1600.webp', caption: 'Perfect moments' },
  { src: '/optimized/20-w1600.webp', caption: 'Love story' },
  { src: '/optimized/21-w1600.webp', caption: 'Two hearts, one love' },
  { src: '/optimized/22-w1600.webp', caption: 'Love and laughter' },
  { src: '/optimized/23-w1600.webp', caption: 'Together forever' },
  { src: '/optimized/24-w1600.webp', caption: 'Perfect moments' },
  { src: '/optimized/25-w1600.webp', caption: 'Love story' },
];

// Usage: import { GalleryAlt } from './components/GalleryAlt';
// Then include <GalleryAlt /> in your page or App component.
export function Gallery_3() {
  return (
    <section className="gallery-alt-section">
      <div className="gallery-alt-content">
        <div className='section-title text-center'>
          <h6 className='event-title uppercase'>Celebrate Our Love</h6>
          <h2 className='event-description'>Join Us as We Begin Our Forever</h2>
        </div>
    
  <div className="gallery-alt-wrapper" style={{ height: '140vh' }}>
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCreative]}
            effect="creative"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={1}
            creativeEffect={{
              prev: {
                // previous slide moves out to the left/up with scale
                translate: ["-20%", 0, -200],
                rotate: [0, 10, 0],
                scale: 0.85,
                opacity: 0.7,
              },
              next: {
                // next slide comes from the right/down with depth
                translate: ["20%", 0, -200],
                rotate: [0, -10, 0],
                scale: 0.85,
                opacity: 0.7,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="gallery-alt-swiper"
          >
            {galleryPhotos_3.map((item, idx) => (
              <SwiperSlide key={idx} style={{ width: '100%' }}>
                <div className="slide-card w-full overflow-hidden relative" style={{ height: '140vh' }}>
                  <img
                    src={item.src}
                    alt={item.caption}
                    loading={idx === 0 ? 'eager' : 'lazy'}
                    className="w-full h-full object-cover block"
                  />

                  {/* Top-right caption overlay: bold white text with strong white glow */}
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: '18px',
                      right: '18px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      pointerEvents: 'none',
                    }}
                  >
                    <span
                      style={{
                        // white at 50% opacity per request (no stroke, no shadow)
                        color: 'rgba(255,255,255,0.5)',
                        fontWeight: 800,
                        // target roughly 2/6 of viewport height; clamp for small screens
                        fontSize: 'clamp(20px, 32vh, 50px)',
                        display: 'inline-block',
                        lineHeight: 1,
                        letterSpacing: '0.2px',
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
