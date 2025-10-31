import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import { Heart, Users, X } from 'lucide-react';

interface RSVPData {
  id: string;
  createdAt: string;
  timestamp: {
    type: string;
    seconds: number;
    nanoseconds: number;
  };
  name: string;
  guestName: string;
  attendance: string;
  message: string;
  active?: number;
}

export function WeddingToast() {
  const [rsvpList, setRsvpList] = useState<RSVPData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClosed, setIsClosed] = useState(false);

  useEffect(() => {
    fetchRSVPData();
  }, []);

  const fetchRSVPData = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'rsvp'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const rsvpData: RSVPData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as RSVPData;
        if (data.active !== 0) {
          rsvpData.push({
            ...data,
            id: doc.id,
          });
        }
      });

      setRsvpList(rsvpData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching RSVP data:', err);
      setLoading(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setIsClosed(true);
    }, 300);
  };

  useEffect(() => {
    if (rsvpList.length === 0 || isClosed) return;

    setIsVisible(true);

    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % rsvpList.length);
        setIsVisible(true);
      }, 300);
    }, 5000);

    return () => clearInterval(timer);
  }, [rsvpList, currentIndex, isClosed]);

  if (loading || rsvpList.length === 0 || isClosed) return null;

  const currentRsvp = rsvpList[currentIndex];

  return (
    <div className='fixed top-2 sm:top-4 left-0 right-0 sm:left-1/2 sm:-translate-x-1/2 z-50 px-3 sm:px-4 sm:w-full sm:max-w-2xl'>
      <div
        className={`transform transition-all duration-300 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <div
          className='bg-white rounded-xl sm:rounded-2xl shadow-2xl border overflow-hidden'
          style={{ borderColor: 'rgba(118, 5, 7, 0.3)' }}
        >
          {/* Header */}
          <div
            className='px-3 py-2 sm:px-6 sm:py-3 flex items-center justify-between'
            style={{
              background:
                'linear-gradient(to right, #760507, #a01618, #760507)',
            }}
          >
            <div className='flex items-center gap-1.5 sm:gap-2'>
              <Heart className='w-4 h-4 sm:w-5 sm:h-5 text-white fill-white animate-pulse' />
              <span className='text-white font-semibold text-xs sm:text-base'>
                {currentRsvp.attendance === 'yes'
                  ? '💕 Lời chúc mới!'
                  : '💌 Thông báo mới!'}
              </span>
            </div>

            <div className='flex items-center gap-2 sm:gap-3 text-white text-xs sm:text-sm'>
              <div className='flex items-center gap-1'>
                <Users className='w-3 h-3 sm:w-4 sm:h-4' />
                <span>
                  {currentIndex + 1}/{rsvpList.length}
                </span>
              </div>

              {/* Nút đóng */}
              <button
                onClick={handleClose}
                className='hover:bg-white/30 active:bg-white/40 p-1 rounded-full transition'
                aria-label='Đóng thông báo'
              >
                <X className='w-4 h-4 sm:w-5 sm:h-5 text-white' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-3 sm:p-6'>
            <div className='flex items-start gap-2.5 sm:gap-4 mb-3 sm:mb-4'>
              <div
                className='w-10 h-10 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0'
                style={{
                  background:
                    'linear-gradient(to bottom right, #760507, #a01618)',
                }}
              >
                <span className='text-white font-bold text-base sm:text-xl'>
                  {currentRsvp.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <h4 className='font-bold text-gray-800 text-base sm:text-xl mb-0.5 sm:mb-1 truncate'>
                  {currentRsvp.name}
                </h4>
                {currentRsvp.guestName && (
                  <p className='text-xs sm:text-sm text-gray-600 mb-1.5 sm:mb-2 truncate'>
                    Khách mời: {currentRsvp.guestName}
                  </p>
                )}
                <div>
                  {currentRsvp.attendance === 'yes' ? (
                    <span className='inline-flex items-center gap-1 bg-green-100 text-green-700 text-[10px] sm:text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full'>
                      ✓ Sẽ tham dự
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-medium px-2 py-1 sm:px-3 sm:py-1.5 rounded-full'>
                      ✗ Không thể tham dự
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentRsvp.message && (
              <div
                className='rounded-lg sm:rounded-xl p-3 sm:p-4 border'
                style={{
                  background:
                    'linear-gradient(to bottom right, #fff5f5, #fef2f2, #fff7ed)',
                  borderColor: 'rgba(118, 5, 7, 0.15)',
                }}
              >
                <p className='text-gray-700 text-xs sm:text-base italic leading-relaxed line-clamp-3 sm:line-clamp-none'>
                  "{currentRsvp.message}"
                </p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className='h-0.5 sm:h-1 bg-gray-100'>
            <div
              className='h-full transition-all duration-[5000ms] ease-linear'
              style={{
                background:
                  'linear-gradient(to right, #760507, #a01618, #760507)',
                width: isVisible ? '100%' : '0%',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
