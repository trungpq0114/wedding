import React, { useState, useEffect, useRef } from 'react';
import './App3.css';
import './styles/carousel.css';
import {
  weddingDate,
  timelineEvents,
  galleryPhotos,
  albumPhotos,
  weddingInfo,
  familyInfo,
  imageUrls,
} from './constants';
import RSVPForm from './components/RSVPForm';
import MungCuoiModal from './components/MungCuoiModal';
import { Hero } from './components/Hero';

const CountdownTimer: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className='countdown-display'>
      <span className='countdown-number'>
        <span className='min-w-[62px] inline-flex items-center justify-center'>
          {String(timeLeft.days).padStart(2, '0')}
        </span>
        :
        <span className='min-w-[62px] inline-flex items-center justify-center'>
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        :
        <span className='min-w-[62px] inline-flex items-center justify-center'>
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        :
        <span className='min-w-[62px] inline-flex items-center justify-center'>
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </span>
    </div>
  );
};

const App3: React.FC = () => {
  const [showGallery, setShowGallery] = useState(false);
  const [showMungCuoiModal, setShowMungCuoiModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [audioRef] = useState<HTMLAudioElement>(() => {
    const audio = new Audio('/audio/nhac.mp3');
    audio.loop = true;
    audio.volume = 0.5;
    return audio;
  });

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.pause();
    } else {
      audioRef.play().catch(console.error);
    }
    setIsPlaying(!isPlaying);
  };

  // Disabled auto-slide for gallery to prevent conflicts with manual interaction
  const handleScroll = () => {
    if (!galleryRef.current) return;
    const scrollLeft = galleryRef.current.scrollLeft;
    const itemWidth = galleryRef.current.offsetWidth * 0.85;
    const newIndex = Math.round(scrollLeft / itemWidth);
    
    if (newIndex !== currentImageIndex) {
      setCurrentImageIndex(newIndex);
      
      // Update active class
      Array.from(galleryRef.current.children).forEach((child, idx) => {
        if (idx === newIndex) {
          child.classList.add('active');
        } else {
          child.classList.remove('active');
        }
      });
    }
  };

  // Audio effect
  useEffect(() => {
    const handleCanPlay = () => {
      // Auto play when audio is ready (some browsers may block this)
      audioRef
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    };

    audioRef.addEventListener('canplay', handleCanPlay);

    return () => {
      audioRef.removeEventListener('canplay', handleCanPlay);
      audioRef.pause();
    };
  }, [audioRef]);

  return (
    <div className='app3-container'>
      {/* Audio Control Button */}

      {/* Section 1 - Hero Background */}
      <section className='hero-section relative'>
        <button
          onClick={toggleAudio}
          className='fixed bottom-6 right-0 bg-[#1a6617] rounded-full music'
        >
          Click music
        </button>

        <Hero />

        <div className='absolute bottom-0 left-0 right-0'>
          <h1 className='font-[MUZUViWSVAtSEFTVEVHSSPVEY] text-center text-[129px] leading-[1] text-white uppercase'>
            Trung
          </h1>

          <div className='flex items-center justify-center'>
            <p className='aaa'>&</p>

            <h1 className='font-[MUZUViWSVAtSEFTVEVHSSPVEY] text-[129px] leading-[1] text-white uppercase'>
              Thảo
            </h1>
          </div>
        </div>
      </section>

      {/* Section 2 - Main Wedding Info */}
      <section className='main-section relative'>
        <div className='main-background'>
          <img
            src={imageUrls.backgroundTexture}
            alt='Background texture'
            className='bg-texture'
          />
        </div>

        <div className='absolute w-full h-full bg-[url(/flower.webp)] bg-no-repeat bg-[position:left_80%] bg-[length:110%] m-0 mx-auto w-full h-full pointer-events-none'></div>

        {/* Main text content */}
        <div className='text-center relative !mt-10'>
          <h1 className='main-title font-[RUJHYXJhbWuZCNZWRpdWudHRm]'>
            QUYẾT ĐỊNH BÊN NHAU
            <br />
            TRỌN ĐỜI.
          </h1>

          <h2 className='save-date'>Save the date</h2>

          <p className='wedding-date'>{weddingInfo.date}</p>
        </div>

        <div className='absolute bottom-13 left-0 right-0 flex items-center justify-center'>
          <img src='/wedding/35.webp' alt='' className='w-[291px]' />
        </div>
      </section>

      {/* Calendar */}
      <div className='calendar-section'>
        <h3 className='calendar-title !pt-10 !pb-4'>Tháng 11</h3>
        <div className='calendar-grid'>
          <div className='calendar-header'>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
          <div className='calendar-body'>
            {/* Empty cells for days before the month starts (if needed) */}
            {/* Assuming the month starts on a Saturday (Thứ Bảy), we need 5 empty cells */}
            {Array.from({ length: 5 }, (_, i) => (
              <div key={`empty-${i}`} className='calendar-day empty'></div>
            ))}

            {/* Days of the month */}
            {Array.from({ length: 31 }, (_, i) => {
              const day = i + 1;
              return (
                <div
                  key={day}
                  className={`relative calendar-day flex items-center justify-center ${
                    day === 5 ? 'wedding-day' : ''
                  }`}
                >
                  {day}

                  {day === 29 && (
                    <img
                      src='/icon/heart.png'
                      alt='heart'
                      className='absolute'
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section 3 - Wedding Details & Calendar */}
      <section className='details-section'>
        <div className='details-content'>
          <h2 className='title'>
            Thân mời tới dự lễ cưới thân mật của chúng tôi
          </h2>

          <div className='relative flex flex-col gap-5 items-center justify-center'>
            <p className='couple-wedding'>Quang Trung</p>
            <p className='ladi-headline absolute'>&</p>
            <p className='couple-wedding'>Phương Thảo</p>
          </div>

          <div className='w-full h-[302px]'>
            <div></div>
          </div>

          {/* Wedding location and info */}
          <div className='wedding-info'>
            {/* Family info */}
            <div className='family-info'>
              <div className='family-side'>
                <h4>{familyInfo.groomFamily.title}</h4>
                <p>
                  {familyInfo.groomFamily.father}
                  <br />
                  {familyInfo.groomFamily.mother}
                  <br />
                  {familyInfo.groomFamily.location}
                </p>
              </div>
              <div className='w-[2px] h-full bg-[#760507]'></div>
              <div className='family-side'>
                <h4>{familyInfo.brideFamily.title}</h4>
                <p>
                  {familyInfo.brideFamily.father}
                  <br />
                  {familyInfo.brideFamily.mother}
                  <br />
                  {familyInfo.brideFamily.location}
                </p>
              </div>
            </div>

            <div className='flex ietems-center justify-center !mb-5'>
              <img src='/one.png' alt='png' className='w-[106.5px]' />
            </div>

            <p className='ceremony-time'>
              tiệc nhà gái được tổ chức
              <br />
              vào lúc 9 giờ 00 phút
            </p>

            <div className='date-info'>
              <span className='day-name'>{weddingInfo.dayName}</span>

              <div className='date-details'>
                <div className='flex flex-col gap-1'>
                  <div className='w-full h-[1px] bg-[#760507]'></div>
                  <span className='month'>{weddingInfo.month}</span>
                  <div className='w-full h-[1px] bg-[#760507]'></div>
                </div>
                <span className='day-number'>{weddingInfo.dayNumber}</span>
                <div className='flex flex-col gap-1'>
                  <div className='w-full h-[1px] bg-[#760507]'></div>
                  <span className='year'>{weddingInfo.year}</span>
                  <div className='w-full h-[1px] bg-[#760507]'></div>
                </div>
              </div>

              <p className='lunar-date'>{weddingInfo.lunarDate}</p>
            </div>

            <div className='flex items-center justify-center !mb-10'>
              <img src='/ss.png' alt='' className='w-[65px]' />
            </div>

            <h3 className='location-title'>{weddingInfo.location}</h3>
            <p className='location-address'>Địa chỉ: {weddingInfo.address}</p>

            <a
              target='_blank'
              href='https://maps.app.goo.gl/YVL6pJnekMEcKsMc7'
              className='flex items-center justify-center gap-2 !mt-10'
            >
              <img src='/icon/map.png' alt='map' className='w-6' />
              <p className='chiduong'>chỉ đường</p>
            </a>
          </div>
        </div>
      </section>

      <div className='relative'>
        <img
          src={'/wedding/27.webp'}
          alt='Timeline background'
          className='timeline-bg'
        />

        <h2 className='timeline-title absolute bottom-0 left-1/2 transform -translate-x-1/2'>
          Timeline
        </h2>
      </div>

      {/* Section 4 - Timeline */}
      <section className='timeline-section !py-10 !px-5'>
        <div className='timeline-content'>
          <div className='timeline-events'>
            {timelineEvents.map((event, index) => (
              <div key={index} className='timeline-event'>
                <div className='event-icon'>
                  <img src={event.icon} alt='Event icon' />
                </div>
                <div className='event-time min-w-[76px]'>{event.time}</div>
                <div className='event-content'>
                  <h4 className='event-title'>{event.title}</h4>
                  <p className='event-description'>{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5 - Our Memories Gallery */}
      <section className='gallery-section'>
        <div className='gallery-background'>
          <img
            src={imageUrls.sectionBackground}
            alt='Gallery background'
            className='gallery-bg'
          />
        </div>

        <div className='gallery-content'>
          <h2 className='gallery-title'>Our Memories</h2>
          <p className='gallery-description'>
            This album captures the most beautiful moments of our special
            day—filled with love, joy, and unforgettable memories. From our
            heartfelt vows to the first dance, every photo tells a story of our
            journey together. Surrounded by family and friends, we celebrated a
            love that will last a lifetime.
          </p>

          <div 
            className='photo-grid'
            ref={galleryRef}
            onMouseEnter={() => setIsUserInteracting(true)}
            onMouseLeave={() => setIsUserInteracting(false)}
            onTouchStart={() => setIsUserInteracting(true)}
            onScroll={handleScroll}
          >
            {galleryPhotos.map((photo, index) => (
              <div
                key={index}
                className='photo-item'
                onClick={() => {
                  setIsUserInteracting(true);
                  setCurrentImageIndex(index);
                  setShowGallery(true);
                }}
              >
                <div className='photo-wrapper'>
                  <img
                    className='photo-img'
                    src={photo}
                    alt={`Memory ${index + 1}`}
                    draggable="false"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5.5 - Album Carousel */}
      <section className="album-carousel-section py-20">
        <div className="container mx-auto px-4">
          <div className="section-title text-center">
            <div className="w-full">
              <h6 className="text-[#760507] text-sm uppercase tracking-widest mb-3 opacity-0 animate-fade-in">
                Celebrate Our Love
              </h6>
              <h2 className="text-4xl font-semibold mb-6 opacity-0 animate-fade-in delay-200">
                Join Us as We Begin Our Forever
              </h2>
            </div>
          </div>
          
          <div className="carousel-container relative overflow-hidden">
            <div className="carousel-track flex transition-transform duration-500 ease-out">
              {albumPhotos.map((photo, index) => (
                <div 
                  key={index}
                  className="carousel-item min-w-[75%] opacity-0 animate-slide-in"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                  }}
                >
                  <div 
                    className="relative overflow-hidden rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 cursor-pointer"
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setShowGallery(true);
                    }}
                  >
                    <img
                      src={photo}
                      alt={`Wedding Album ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors z-10"
              onClick={() => {
                const track = document.querySelector('.carousel-track');
                if (track) {
                  const currentScroll = track.scrollLeft;
                  track.scrollTo({
                    left: currentScroll - window.innerWidth * 0.75,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              &#8592;
            </button>
            
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center text-gray-800 hover:bg-gray-100 transition-colors z-10"
              onClick={() => {
                const track = document.querySelector('.carousel-track');
                if (track) {
                  const currentScroll = track.scrollLeft;
                  track.scrollTo({
                    left: currentScroll + window.innerWidth * 0.75,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              &#8594;
            </button>
          </div>
        </div>
      </section>

      {/* Section 6 - RSVP */}
      <section className='rsvp-section'>
        <RSVPForm />

        <button className='mungcuoi' onClick={() => setShowMungCuoiModal(true)}>
          MỪNG CƯỚI
        </button>
      </section>

      {/* Gallery Modal */}
      {showGallery && (
        <div className='gallery-modal' onClick={() => setShowGallery(false)}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <button className='close-btn' onClick={() => setShowGallery(false)}>
              x
            </button>
            <h3>Album ảnh cưới</h3>
            <div className='modal-image-container'>
              <button 
                className='nav-btn prev'
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => 
                    prev > 0 ? prev - 1 : galleryPhotos.length - 1
                  );
                }}
              >
                ‹
              </button>
              <img 
                key={currentImageIndex}
                src={galleryPhotos[currentImageIndex]} 
                alt={`Gallery ${currentImageIndex + 1}`}
                className='modal-image'
                style={{
                  willChange: 'transform, opacity'
                }}
              />
              <button 
                className='nav-btn next'
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentImageIndex((prev) => 
                    (prev + 1) % galleryPhotos.length
                  );
                }}
              >
                ›
              </button>
            </div>
            <div className='modal-counter'>
              {currentImageIndex + 1} / {galleryPhotos.length}
            </div>
          </div>
        </div>
      )}

      {/* Mung Cuoi Modal */}
      <MungCuoiModal
        isOpen={showMungCuoiModal}
        onClose={() => setShowMungCuoiModal(false)}
      />

      <div>
        <p className='countdown-label'>Countdown</p>
        <CountdownTimer targetDate={weddingDate} />
      </div>

      <div className='image-container flex flex-col items-center justify-between'>
        <p className='loichuc !px-5 !pt-5'>
          Cảm ơn bạn đã dành tình cảm cho chúng mình! Sự hiện diện của bạn chính
          là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng
          bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
        </p>

        <p className='thank-you !mb-5'>Thank you!</p>
      </div>
    </div>
  );
};

export default App3;
