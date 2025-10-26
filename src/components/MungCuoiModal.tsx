import React from 'react';
import { weddingInfo } from '../constants';
import { X } from 'lucide-react';

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
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        // STOP propagation on content container — bảo đảm mọi click trong modal ko bubble ra overlay
        onClick={stop}
        className="relative bg-gray-800/90 text-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-[0_0_30px_rgba(255,255,255,0.1)] border border-white/90 backdrop-blur-xl"
      >
        {/* Close button */}
        <button
          type="button"
          // stopPropagation trực tiếp trên button + gọi onClose
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-white/10 hover:bg-white/90 text-white flex items-center justify-center transition-all border border-white/30 shadow-md backdrop-blur-sm z-[1100]"
          aria-label="Đóng"
        >
          <X size={22} />
        </button>

        {/* Header */}
        <div className="bg-white/10 px-6 py-4 rounded-t-3xl border-b border-white/90 backdrop-blur-md">
          <h3 className="text-3xl font-serif font-semibold text-white text-center tracking-wide">
            Mừng Cưới
          </h3>
          <p className="text-sm text-white/80 text-center mt-1 italic">
            {weddingInfo.groom} & {weddingInfo.bride}
          </p>
        </div>

        {/* Couple photo */}
        <div className="p-8 flex flex-col items-center">
          <div className="rounded-2xl w-2/3 overflow-hidden shadow-lg mb-8 border border-white/30">
            <img
              src="/optimized/6-w1600.webp"
              alt="Couple photo"
              className="w-full h-auto object-cover opacity-90"
            />
          </div>

          {/* QR Code section */}
          <div className="space-y-6 w-full">
            <h4 className="text-lg font-serif font-semibold text-white text-center mb-2 tracking-wide">
              Gửi lời chúc mừng qua chuyển khoản
            </h4>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Chú rể */}
              <div className="bg-white/10 rounded-2xl p-6 shadow-md border border-white/90 hover:bg-white/90 transition-all backdrop-blur-md">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-white/10 rounded-xl border border-white/90">
                    <div className="w-44 bg-white/5 rounded-lg flex items-center justify-center border border-white/90 overflow-hidden">
                      <img
                        src="/icon/trung.webp"
                        alt="QR Code Chú rể"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-white font-medium">
                  Chú rể
                </p>
              </div>

              {/* Cô dâu */}
              <div className="bg-white/10 rounded-2xl p-6 shadow-md border border-white/90 hover:bg-white/90 transition-all backdrop-blur-md">
                <div className="text-center mb-4">
                  <div className="inline-block p-3 bg-white/10 rounded-xl border border-white/90">
                    <div className="w-44 bg-white/5 rounded-lg flex items-center justify-center border border-white/90 overflow-hidden">
                      <img
                        src="/icon/thao.webp"
                        alt="QR Code Cô dâu"
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm text-white font-medium">
                  Cô dâu
                </p>
              </div>
            </div>

            {/* Thank you message */}
            <div className="mt-6 p-5 bg-white/10 rounded-xl border border-white/90 shadow-inner backdrop-blur-md">
              <p className="text-center text-sm text-white/80 italic font-serif">
                Cảm ơn bạn đã gửi lời chúc và tình cảm đến đám cưới của chúng mình
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MungCuoiModal;
