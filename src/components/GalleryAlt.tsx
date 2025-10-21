import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const galleryPhotos_2 = [
  { src: '/optimized/3-w1600.webp', caption: 'Our first hello' },
  { src: '/optimized/5-w1600.webp', caption: 'Promise under the sky' },
  { src: '/optimized/6-w1600.webp', caption: 'Laughter and vows' },
  { src: '/optimized/7-w1600.webp', caption: 'Quiet stolen moments' },
  { src: '/optimized/8-w1600.webp', caption: 'Sunset we remember' },
  { src: '/optimized/9-w1600.webp', caption: 'Hands held tight' },
  { src: '/optimized/10-w1600.webp', caption: 'A walk together' },
  { src: '/optimized/12-w1600.webp', caption: 'A toast to us' },
  { src: '/optimized/13-w1600.webp', caption: 'This is our love story' },
];

// Usage: import { GalleryAlt } from './components/GalleryAlt';
// Then include <GalleryAlt /> in your page or App component.
export function GalleryAlt() {
  return (
    <section className="gallery-alt-section">
      <div className="gallery-alt-content">
        <h2 className="gallery-alt-title">Highlights</h2>
        <p className="gallery-alt-description">A different look at the day — captions, coverflow, and navigation controls.</p>

        <div className="gallery-alt-wrapper h-[420px]">
          <Swiper
            modules={[Autoplay, Navigation, Pagination, EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: false,
            }}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="gallery-alt-swiper"
          >
            {galleryPhotos_2.map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{ width: '320px', display: 'flex', justifyContent: 'center' }}
              >
                  <div className="slide-card w-full h-full overflow-hidden rounded-md shadow-md relative">
                    <img
                      src={item.src}
                      alt={item.caption}
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-64 object-cover block"
                    />

                    {/* Caption overlay: top-right, bold white text with subtle white glow/blur */}
                    <div
                      aria-hidden
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        padding: '6px 10px',
                        borderRadius: '6px',
                        backdropFilter: 'blur(4px)',
                        WebkitBackdropFilter: 'blur(4px)',
                        background: 'rgba(255,255,255,0.06)',
                        boxShadow: '0 2px 10px rgba(255,255,255,0.08)',
                        pointerEvents: 'none',
                      }}
                    >
                      <span
                        style={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: '13px',
                          textShadow: '0 2px 8px rgba(255,255,255,0.6)',
                          display: 'inline-block',
                          lineHeight: 1,
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
