import React, { useState, useEffect } from 'react';
import './App3.css';
import './styles/carousel.css';

import {
  weddingDate,
  timelineEvents,
  weddingInfo,
  familyInfo,
  imageUrls,
} from './constants';
import RSVPForm from './components/RSVPForm';
import MungCuoiModal from './components/MungCuoiModal';
import { Hero } from './components/Hero';
import { Gallery_1 } from './components/Gallery_1.tsx';
import { Gallery_2 } from './components/Gallery_2.tsx';
import { Gallery_3 } from './components/Gallery_3.tsx';
import { Gallery_4 } from './components/Gallery_4.tsx';
import { Gallery_5 } from './components/Gallery_5.tsx';
// import { Gallery_6 } from './components/Gallery_6.tsx';
import { Audio } from './components/Audio';
import { Title } from './components/Title.tsx';
import { Rotate } from './components/Rotate.tsx';
import { motion } from 'framer-motion';
import { GsapImage } from './components/GsapImage.tsx';
import { Timeline } from './components/Timeline.tsx';

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
    <motion.div
      className='countdown-display'
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <span className='countdown-number'>
        <motion.span
          className='min-w-[62px] inline-flex items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: 0.2,
            bounce: 0.4,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {String(timeLeft.days).padStart(2, '0')}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.6,
            delay: 0.4,
            bounce: 0.5,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          :
        </motion.span>
        <motion.span
          className='min-w-[62px] inline-flex items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: 0.6,
            bounce: 0.4,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {String(timeLeft.hours).padStart(2, '0')}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.6,
            delay: 0.8,
            bounce: 0.5,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          :
        </motion.span>
        <motion.span
          className='min-w-[62px] inline-flex items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: 1.0,
            bounce: 0.4,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {String(timeLeft.minutes).padStart(2, '0')}
        </motion.span>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            type: 'spring',
            duration: 0.6,
            delay: 1.2,
            bounce: 0.5,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          :
        </motion.span>
        <motion.span
          className='min-w-[62px] inline-flex items-center justify-center'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            type: 'spring',
            duration: 0.8,
            delay: 1.4,
            bounce: 0.4,
          }}
          viewport={{ once: true, amount: 0.5 }}
        >
          {String(timeLeft.seconds).padStart(2, '0')}
        </motion.span>
      </span>
    </motion.div>
  );
};

const App3: React.FC = () => {
  const [showMungCuoiModal, setShowMungCuoiModal] = useState(false);

  return (
    <div className='app3-container'>
      {/* Section 1 - Hero Background */}
      <section className='hero-section relative'>
        <Audio />

        <Hero />

        <Title />
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

        <Rotate />
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
          <div>
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              className='title'
            >
              Thân mời tới dự lễ cưới thân mật của chúng tôi
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 1,
              }}
              className='relative flex flex-col gap-5 items-center justify-center'
            >
              <p className='couple-wedding'>Quang Trung</p>
              <p className='ladi-headline absolute'>&</p>
              <p className='couple-wedding'>Phương Thảo</p>
            </motion.div>
          </div>

          <GsapImage />

          {/* Wedding location and info */}
          <div className='wedding-info'>
            {/* Family info */}
            <div className='family-info'>
              <motion.div
                initial={{ opacity: 0, x: -100 }}
                transition={{
                  type: 'spring', // ← Dùng spring thay vì ease
                  duration: 1,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className='family-side'
              >
                <h4>{familyInfo.groomFamily.title}</h4>
                <p>
                  {familyInfo.groomFamily.father}
                  <br />
                  {familyInfo.groomFamily.mother}
                  <br />
                  {familyInfo.groomFamily.location}
                </p>
              </motion.div>
              <div className='w-[2px] h-full bg-[#760507]'></div>
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                transition={{
                  type: 'spring', // ← Dùng spring thay vì ease
                  duration: 1,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{
                  once: true,
                  amount: 0.3,
                }}
                className='family-side'
              >
                <h4>{familyInfo.brideFamily.title}</h4>
                <p>
                  {familyInfo.brideFamily.father}
                  <br />
                  {familyInfo.brideFamily.mother}
                  <br />
                  {familyInfo.brideFamily.location}
                </p>
              </motion.div>
            </div>

            <div className='flex ietems-center justify-center !mb-5'>
              <img src='/one.png' alt='png' className='w-[106.5px]' />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              className='ceremony-time'
            >
              tiệc nhà gái được tổ chức
              <br />
              vào lúc 9 giờ 00 phút
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              className='date-info'
            >
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
            </motion.div>

            <div className='flex items-center justify-center !mb-10'>
              <img src='/ss.png' alt='ss' className='w-[65px]' />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{
                once: true,
                amount: 0.5,
              }}
              className='wedding-location'
            >
              <h3 className='location-title'>{weddingInfo.location}</h3>
              <p className='location-address'>Địa chỉ: {weddingInfo.address}</p>
            </motion.div>

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

      <section className='relative'>
        <img
          src={'/optimized/27-w1600.webp'}
          alt='Timeline background'
          className='timeline-bg'
        />

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{
            once: true,
            amount: 0.5,
          }}
          className='timeline-title absolute bottom-0 left-1/2 transform -translate-x-1/2'
        >
          Timeline
        </motion.h2>
      </section>

      {/* Section 4 - Timeline */}
      <Timeline />

      <Gallery_1 />

      <Gallery_2 />

      <Gallery_3 />

      <Gallery_4 />

      <Gallery_5 />

      <section className='rsvp-section'>
        <RSVPForm />

        <button className='mungcuoi' onClick={() => setShowMungCuoiModal(true)}>
          MỪNG CƯỚI
        </button>
      </section>

      <section>
        <motion.p
          className='countdown-label'
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.5 }}
        >
          Countdown
        </motion.p>
        <CountdownTimer targetDate={weddingDate} />
      </section>

      <section className='image-container flex flex-col items-center justify-between'>
        <motion.p
          className='loichuc !px-5 !pt-5'
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Cảm ơn bạn đã dành tình cảm cho chúng mình! Sự hiện diện của bạn chính
          là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng
          bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.
        </motion.p>

        <motion.p
          className='thank-you !mb-5'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.4,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Thank you!
        </motion.p>
      </section>

      {/* Mung Cuoi Modal */}
      <MungCuoiModal
        isOpen={showMungCuoiModal}
        onClose={() => setShowMungCuoiModal(false)}
      />
    </div>
  );
};

export default App3;
