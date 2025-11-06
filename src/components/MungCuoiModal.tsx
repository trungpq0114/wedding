import React from 'react';
import { weddingInfo } from '../constants';
import { X } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';

interface MungCuoiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MungCuoiModal: React.FC<MungCuoiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // đóng chỉ khi click trực tiếp vào overlay (không phải con)
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className='fixed inset-0 bg-gradient-to-br from-black/90 via-[#760507]/40 to-black/90 flex items-center justify-center z-[1000] p-4 backdrop-blur-md'
      onClick={handleOverlayClick}
      aria-modal='true'
      role='dialog'
    >
      <div
        onClick={stop}
        className='relative bg-gradient-to-br from-[#fefefe] to-[#f8f5f0] rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-[0_25px_60px_rgba(0,0,0,0.3)] border-2 border-[#D4AF37]'
        style={{
          background: 'linear-gradient(145deg, #fefefe 0%, #f8f5f0 100%)',
        }}
      >
        {/* Decorative top border */}
        <div className='absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent'></div>

        {/* Close button */}
        <button
          type='button'
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className='absolute top-4 right-4 w-10 h-10 rounded-full bg-white hover:bg-[#760507] text-[#760507] hover:text-white flex items-center justify-center transition-all border-2 border-[#760507] shadow-lg z-[1100] group'
          aria-label='Đóng'
        >
          <X
            size={20}
            className='group-hover:rotate-90 transition-transform duration-300'
          />
        </button>

        {/* Header with ornamental design */}
        <div className='relative px-8 py-6 border-b border-[#D4AF37]/30'>
          <div className='text-center space-y-2'>
            <div className='text-2xl text-[#D4AF37] mb-2'>❦</div>
            <h3 className='text-4xl font-serif font-light text-[#760507] tracking-wide'>
              Mừng Cưới
            </h3>
            <div className='flex items-center justify-center gap-3 mt-3'>
              <div className='h-px w-12 bg-gradient-to-r from-transparent to-[#D4AF37]'></div>
              <p className='text-base text-[#8B4513] font-serif italic'>
                {weddingInfo.groom} & {weddingInfo.bride}
              </p>
              <div className='h-px w-12 bg-gradient-to-l from-transparent to-[#D4AF37]'></div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className='p-8 space-y-8'>
          {/* Couple photo with elegant frame */}
          <div className='flex justify-center'>
            <div className='relative group'>
              <div className='absolute -inset-2 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-2xl opacity-20 blur-sm group-hover:opacity-30 transition-opacity'></div>
              <div className='relative rounded-xl overflow-hidden shadow-2xl border-4 border-white w-64 md:w-80'>
                <img
                  src='/optimized/69-w1600.webp'
                  alt='Couple photo'
                  className='w-full h-auto object-cover'
                />
              </div>
            </div>
          </div>

          {/* Decorative divider */}
          <div className='flex items-center justify-center gap-4'>
            <div className='h-px flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent'></div>
            <span className='text-[#D4AF37] text-xl'>✦</span>
            <div className='h-px flex-1 bg-gradient-to-l from-transparent via-[#D4AF37] to-transparent'></div>
          </div>

          {/* QR Code section with elegant cards */}
          <div className='space-y-6'>
            <div className='text-center'>
              <h4 className='text-xl font-serif text-[#760507] mb-2'>
                Gửi lời chúc mừng qua chuyển khoản
              </h4>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              {/* Chú rể Card */}
              <div className='group'>
                <div className='relative bg-white rounded-2xl p-6 shadow-lg border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl'>
                  <div className='absolute top-3 right-3 text-[#D4AF37] opacity-20 group-hover:opacity-40 transition-opacity text-2xl'>
                    ❦
                  </div>

                  <div className='space-y-4'>
                    <div className='flex justify-center'>
                      <div className='relative p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner'>
                        <div className='w-44 h-44 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-[#D4AF37]/30'>
                          <PhotoProvider>
                            <PhotoView src={'/icon/trung.webp'}>
                              <img
                                src='/icon/trung.webp'
                                alt='QR Code Chú rể'
                                className='w-full h-full object-contain'
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                      </div>
                    </div>

                    <div className='text-center pt-2 border-t border-[#D4AF37]/20'>
                      <p className='text-[#760507] font-serif font-medium text-lg'>
                        Chú rể
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cô dâu Card */}
              <div className='group'>
                <div className='relative bg-white rounded-2xl p-6 shadow-lg border-2 border-[#D4AF37]/20 hover:border-[#D4AF37] transition-all duration-300 hover:shadow-xl'>
                  <div className='absolute top-3 right-3 text-[#D4AF37] opacity-20 group-hover:opacity-40 transition-opacity text-2xl'>
                    ❦
                  </div>

                  <div className='space-y-4'>
                    <div className='flex justify-center'>
                      <div className='relative p-4 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-inner'>
                        <div className='w-44 h-44 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-[#D4AF37]/30'>
                          <PhotoProvider>
                            <PhotoView src={'/icon/thao.webp'}>
                              <img
                                src='/icon/thao.webp'
                                alt='QR Code Cô dâu'
                                className='w-full h-full object-contain'
                              />
                            </PhotoView>
                          </PhotoProvider>
                        </div>
                      </div>
                    </div>

                    <div className='text-center pt-2 border-t border-[#D4AF37]/20'>
                      <p className='text-[#760507] font-serif font-medium text-lg'>
                        Cô dâu
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank you message with elegant styling */}
            <div className='relative mt-8 p-6 bg-gradient-to-br from-[#f8f5f0] to-white rounded-xl border border-[#D4AF37]/30 shadow-md'>
              <div className='absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white px-4 py-1 rounded-full border border-[#D4AF37]/30'>
                <span className='text-[#D4AF37] text-sm'>✦ ✦ ✦</span>
              </div>
              <p className='text-center text-[#760507] font-serif italic leading-relaxed pt-2'>
                Cảm ơn bạn đã gửi lời chúc và tình cảm đến đám cưới của chúng
                mình ❤️
              </p>
            </div>
          </div>
        </div>

        {/* Decorative bottom border */}
        <div className='absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent'></div>
      </div>
    </div>
  );
};

export default MungCuoiModal;
