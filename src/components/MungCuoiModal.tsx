import React from 'react';
import { weddingInfo } from '../constants';
import { X } from 'lucide-react';

interface MungCuoiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MungCuoiModal: React.FC<MungCuoiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className='fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='bg-gradient-to-br from-amber-50 via-white to-amber-50 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          className='absolute top-2 right-2 w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white text-2xl flex items-center justify-center transition-all z-10 backdrop-blur-sm'
          onClick={onClose}
        >
          <X />
        </button>

        {/* Header */}
        <div className=' bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-4 rounded-t-3xl border-b-2 border-amber-200'>
          <h3 className='text-2xl font-bold text-amber-900 text-center font-serif'>
            💝 Mừng Cưới 💝
          </h3>
          <p className='text-sm text-amber-700 text-center mt-1'>
            {weddingInfo.groom} & {weddingInfo.bride}
          </p>
        </div>

        {/* Couple photo */}
        <div className='p-6 flex flex-col items-center'>
          <div className='rounded-2xl w-1/2 overflow-hidden shadow-lg mb-6'>
            <img
              src='/optimized/6-w1600.webp'
              alt='Couple photo'
              className='w-full h-auto object-cover'
            />
          </div>

          {/* QR Code section */}
          <div className='space-y-4'>
            <h4 className='text-lg font-semibold text-amber-900 text-center mb-4'>
              Gửi lời chúc mừng qua chuyển khoản
            </h4>

            <div className='grid md:grid-cols-2 gap-4'>
              {/* Chú rể - Trung */}
              <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-amber-200 hover:shadow-xl transition-shadow'>
                <div className='text-center mb-4'>
                  <div className='inline-block p-2 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl'>
                    <div className='w-40 bg-white rounded-lg flex items-center justify-center border-2 border-blue-300'>
                      <img
                        src='/icon/trung.webp'
                        alt='QR Code Chú rể'
                        className='w-full'
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Cô dâu - Thảo */}
              <div className='bg-white rounded-2xl p-6 shadow-lg border-2 border-pink-200 hover:shadow-xl transition-shadow'>
                <div className='text-center mb-4'>
                  <div className='inline-block p-2 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl'>
                    <div className='w-40 bg-white rounded-lg flex items-center justify-center border-2 border-pink-300'>
                      <img
                        src='/icon/thao.webp'
                        alt='QR Code Chú rể'
                        className='w-full'
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Thank you message */}
            <div className='mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200'>
              <p className='text-center text-sm text-amber-800 italic'>
                ✨ Cảm ơn bạn đã dành tình cảm đến đám cưới của chúng mình! ✨
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MungCuoiModal;
