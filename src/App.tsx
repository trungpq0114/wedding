import React, { useState, useEffect } from 'react';
import './App.css';

// Component cho đếm ngược
const Countdown: React.FC<{ targetDate: Date }> = ({ targetDate }) => {
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
    <div className='countdown'>
      <div className='countdown-item'>
        <span>{timeLeft.days}</span>
        <p>Ngày</p>
      </div>
      <div className='countdown-item'>
        <span>{timeLeft.hours}</span>
        <p>Giờ</p>
      </div>
      <div className='countdown-item'>
        <span>{timeLeft.minutes}</span>
        <p>Phút</p>
      </div>
      <div className='countdown-item'>
        <span>{timeLeft.seconds}</span>
        <p>Giây</p>
      </div>
    </div>
  );
};

// Component cho form RSVP
const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    message: '',
    attendance: '',
    numberOfGuests: '',
    invitedBy: '',
  });

  const [showThankYou, setShowThankYou] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowThankYou(true);
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (showThankYou) {
    return (
      <div className='thank-you-popup'>
        <div className='popup-content'>
          <h3>Thank you!</h3>
          <p>
            Cảm ơn bạn đã dành thời gian phản hồi.
            <br />
            Chúng mình vô cùng trân quý sự quan tâm của bạn.
          </p>
          <button onClick={() => setShowThankYou(false)}>Đóng</button>
        </div>
      </div>
    );
  }

  return (
    <form className='rsvp-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <input
          type='text'
          name='name'
          placeholder='Tên của bạn'
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className='form-group'>
        <textarea
          name='message'
          placeholder='Gửi lời nhắn đến cô dâu chú rể'
          value={formData.message}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className='form-group'>
        <select
          name='attendance'
          value={formData.attendance}
          onChange={handleInputChange}
          required
        >
          <option value=''>Bạn sẽ đến chứ?</option>
          <option value='yes'>Mình chắc chắn sẽ đến</option>
          <option value='no'>Xin lỗi mình bận rồi!</option>
        </select>
      </div>

      <div className='form-group'>
        <select
          name='numberOfGuests'
          value={formData.numberOfGuests}
          onChange={handleInputChange}
          required
        >
          <option value=''>Bạn tham dự cùng ai?</option>
          <option value='1'>1 người</option>
          <option value='2'>2 người</option>
          <option value='3'>3 người</option>
          <option value='4'>4 người</option>
        </select>
      </div>

      <div className='form-group'>
        <select
          name='invitedBy'
          value={formData.invitedBy}
          onChange={handleInputChange}
          required
        >
          <option value=''>Bạn là khách mời của ai?</option>
          <option value='bride'>Khách mời cô dâu</option>
          <option value='groom'>Khách mời chú rể</option>
        </select>
      </div>

      <button type='submit' className='submit-btn'>
        GỬI LỜI NHẮN VÀ XÁC NHẬN
      </button>
    </form>
  );
};

function App() {
  const [showGiftInfo, setShowGiftInfo] = useState(false);
  const [audioStarted, setAudioStarted] = useState(false);
  const weddingDate = new Date('2025-07-05T19:00:00');

  // Setup audio like in original HTML
  useEffect(() => {
    const audio = new Audio('https://camcui.vn/bai65.mp3');

    const handleUserInteraction = () => {
      if (!audioStarted) {
        audio.play().catch(console.error);
        setAudioStarted(true);
      }
    };

    // Auto replay when ended
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play().catch(console.error);
    });

    // Start audio on first user interaction
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touch', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touch', handleUserInteraction);
      audio.pause();
    };
  }, [audioStarted]);

  const timeline = [
    { time: '17:30', event: 'Ăn kem, chụp ảnh với photobooth' },
    { time: '18:00', event: 'Tiếp đón khách mời' },
    { time: '19:00', event: 'Bắt đầu lễ thành hôn' },
    { time: '19:30', event: 'Khai tiệc chúc mừng' },
  ];

  const galleryImages = [
    'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/499986782_1217924883305480_8112103841224992916_n-20250801052938-_zl1f.jpg',
    'https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/500072583_1217915583306410_4705695238620587162_n-20250801052938-t-f2g.jpg',
    'https://w.ladicdn.com/s750x600/6322a62f2dad980013bb5005/499969596_1217929596638342_9122326818986027469_n-20250801053747-ju7oi.jpg',
  ];

  return (
    <div className='wedding-app'>
      {/* Hero Section */}
      <section className='hero-section'>
        <div className='hero-background'>
          <img
            src='https://w.ladicdn.com/s750x1000/6322a62f2dad980013bb5005/499989639_1217919023306066_955584835232420740_n-20250801052722-gfowu.jpg'
            alt='Wedding'
            className='hero-bg-image'
          />
          <div className='hero-overlay'>
            <div className='hero-content'>
              <h1 className='couple-names'>Quang Trung & Phương Thảo</h1>
              <h2 className='wedding-title'>Wedding Day</h2>
              <p className='wedding-subtitle'>
                Chúng mình sẽ tổ chức lễ cưới vào
              </p>
              <p className='wedding-date'>05 . 07 . 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Wedding Info Section */}
      <section className='wedding-info-section'>
        <div className='container'>
          <h2 className='section-title'>Thông Tin Đám Cưới</h2>

          <div className='wedding-info-grid'>
            <div className='info-card bride-card'>
              <img
                src='https://w.ladicdn.com/s650x750/6322a62f2dad980013bb5005/500072583_1217915583306410_4705695238620587162_n-20250801052938-t-f2g.jpg'
                alt='Cô dâu'
                className='info-image'
              />
              <div className='info-content'>
                <h3>Cô Dâu</h3>
                <h4>Đỗ Phương Thảo</h4>
              </div>
            </div>

            <div className='info-card groom-card'>
              <img
                src='https://w.ladicdn.com/s650x750/6322a62f2dad980013bb5005/499986782_1217924883305480_8112103841224992916_n-20250801052938-_zl1f.jpg'
                alt='Chú rể'
                className='info-image'
              />
              <div className='info-content'>
                <h3>Chú Rể</h3>
                <h4>Phạm Quang Trung</h4>
              </div>
            </div>
          </div>

          <div className='wedding-details'>
            <div className='parents-info'>
              <div className='parent-section'>
                <h4>Nhà gái</h4>
                <p>Ông. Phạm Tiến Hưng</p>
                <p>Bà. Nguyễn Thị Thắng</p>
                <p>TP. HCM</p>
              </div>

              <div className='parent-section'>
                <h4>Nhà trai</h4>
                <p>Ông. Ngô Văn Tiến</p>
                <p>Bà. Phạm Thị Thu Thủy</p>
                <p>TP. HCM</p>
              </div>
            </div>

            <p className='invitation-text'>
              Kính mời tham dự tiệc thân mật của chúng tôi
            </p>

            <div className='detail-row'>
              <div className='detail-label'>Lễ Cưới</div>
              <div className='detail-value'>Chủ Nhật</div>
            </div>
            <div className='detail-row'>
              <div className='detail-label'>Ngày</div>
              <div className='detail-value'>05 | 07 | 2025</div>
            </div>
            <div className='detail-separator'></div>
            <div className='detail-row'>
              <div className='detail-label'>Tiệc Cưới</div>
              <div className='detail-value'>Chủ Nhật</div>
            </div>

            <p className='venue-info'>Lễ cưới được tổ chức tại</p>
            <h3 className='venue-name'>TTTM Lotte Center Hanoi</h3>
            <p className='venue-address'>
              Số 54 Liễu Giai, Cống Vị, Ba Đình, Hà Nội
            </p>
            <p className='venue-time'>
              Vào lúc 19h00 tối - Chủ nhật ngày 05/07/2025
            </p>

            <a
              href='https://maps.app.goo.gl/EoKsSLhT3woFhtSZ6'
              target='_blank'
              rel='noopener noreferrer'
              className='map-link'
            >
              XEM BẢN ĐỒ
            </a>
          </div>
        </div>
      </section>

      {/* Save the Date Section */}
      <section className='save-date-section'>
        <div className='container'>
          <h2 className='section-title elegance'>Save The Date</h2>
          <h3 className='couple-name-script'>July</h3>

          {/* Calendar */}
          <div className='calendar'>
            <div className='calendar-header'>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
              <span>Sun</span>
            </div>
            <div className='calendar-grid'>
              {/* July 2025 starts on Tuesday, so add 1 empty cell */}
              <div className='calendar-day empty'></div>
              {Array.from({ length: 31 }, (_, i) => (
                <div
                  key={i + 1}
                  className={`calendar-day ${i + 1 === 5 ? 'wedding-day' : ''}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          <p className='countdown-label'>Sự kiện sẽ diễn ra sau</p>

          <Countdown targetDate={weddingDate} />
        </div>
      </section>

      {/* Timeline Section */}
      <section className='timeline-section'>
        <div className='container'>
          <h2 className='section-title'>Timeline</h2>

          <div className='timeline'>
            {timeline.map((item, index) => (
              <div key={index} className='timeline-item'>
                <div className='timeline-time'>{item.time}</div>
                <div className='timeline-line'></div>
                <div className='timeline-event'>{item.event}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className='gallery-section'>
        <div className='container'>
          <h2 className='section-title'>Our Memories</h2>

          <div className='gallery'>
            {galleryImages.map((image, index) => (
              <div key={index} className='gallery-item'>
                <img src={image} alt={`Memory ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RSVP Section */}
      <section className='rsvp-section'>
        <div className='container'>
          <div className='rsvp-content'>
            <RSVPForm />

            <div className='gift-info-section'>
              <button
                className='gift-btn'
                onClick={() => setShowGiftInfo(true)}
              >
                QUÀ MỪNG CƯỚI
              </button>

              <p className='rsvp-message'>
                Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp
                một cách chu đáo nhất.
                <br />
                Trân trọng!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final Message Section */}
      <section className='final-section'>
        <div className='container'>
          <h2 className='final-title'>In you</h2>
          <p className='final-message'>
            I've found my home
            <br />
            my heart
            <br />
            and my forever
          </p>
        </div>
      </section>

      {/* Gift Info Popup */}
      {showGiftInfo && (
        <div className='popup-overlay'>
          <div className='popup-content gift-popup'>
            <button
              className='close-btn'
              onClick={() => setShowGiftInfo(false)}
            >
              ×
            </button>

            <h3>Thông tin chuyển khoản</h3>

            <div className='gift-accounts'>
              <div className='account-info'>
                <h4>Cô dâu</h4>
                <p className='account-name'>Đỗ Phương Thảo</p>
                <p className='account-details'>
                  Vietcombank
                  <br />
                  007103300939389
                </p>
              </div>

              <div className='account-info'>
                <h4>Chú rể</h4>
                <p className='account-name'>Phạm Quang Trung</p>
                <p className='account-details'>
                  VPBank
                  <br />
                  113dfd045547
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
