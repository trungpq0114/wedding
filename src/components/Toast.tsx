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
}

export function WeddingToast() {
  const [rsvpList, setRsvpList] = useState<RSVPData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isClosed, setIsClosed] = useState(false); // ✅ trạng thái đã đóng

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
        rsvpData.push({
          id: doc.id,
          ...doc.data(),
        } as RSVPData);
      });

      setRsvpList(rsvpData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching RSVP data:', err);
      setLoading(false);
    }
  };

  // ❌ Khi nhấn X => đóng toast và ngừng hiển thị
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

  if (loading || rsvpList.length === 0 || isClosed) return null; // ✅ Không render nếu đã đóng

  const currentRsvp = rsvpList[currentIndex];

  return (
    <div className='fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4'>
      <div
        className={`transform transition-all duration-300 ${
          isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-full opacity-0'
        }`}
      >
        <div className='bg-white rounded-2xl shadow-2xl border-2 border-rose-200 overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-rose-400 to-pink-500 px-6 py-3 flex items-center justify-between'>
            <div className='flex items-center gap-2'>
              <Heart className='w-5 h-5 text-white fill-white animate-pulse' />
              <span className='text-white font-semibold'>
                {currentRsvp.attendance === 'yes'
                  ? '💕 Lời chúc mới!'
                  : '💌 Thông báo mới!'}
              </span>
            </div>

            <div className='flex items-center gap-3 text-white text-sm'>
              <div className='flex items-center gap-1'>
                <Users className='w-4 h-4' />
                <span>
                  {currentIndex + 1}/{rsvpList.length}
                </span>
              </div>

              {/* Nút đóng */}
              <button
                onClick={handleClose}
                className='hover:bg-rose-500/30 p-1 rounded-full transition'
                aria-label='Đóng thông báo'
              >
                <X className='w-5 h-5 text-white' />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-6'>
            <div className='flex items-start gap-4 mb-4'>
              <div className='w-14 h-14 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0'>
                <span className='text-white font-bold text-xl'>
                  {currentRsvp.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <div className='flex-1 min-w-0'>
                <h4 className='font-bold text-gray-800 text-xl mb-1'>
                  {currentRsvp.name}
                </h4>
                {currentRsvp.guestName && (
                  <p className='text-sm text-gray-600 mb-2'>
                    Khách mời: {currentRsvp.guestName}
                  </p>
                )}
                <div>
                  {currentRsvp.attendance === 'yes' ? (
                    <span className='inline-flex items-center gap-1 bg-green-100 text-green-700 text-xs font-medium px-3 py-1.5 rounded-full'>
                      ✓ Sẽ tham dự
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full'>
                      ✗ Không thể tham dự
                    </span>
                  )}
                </div>
              </div>
            </div>

            {currentRsvp.message && (
              <div className='bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl p-4 border border-rose-100'>
                <p className='text-gray-700 text-base italic leading-relaxed'>
                  "{currentRsvp.message}"
                </p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          <div className='h-1 bg-gray-100'>
            <div
              className='h-full bg-gradient-to-r from-rose-400 to-pink-500 transition-all duration-[5000ms] ease-linear'
              style={{ width: isVisible ? '100%' : '0%' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
