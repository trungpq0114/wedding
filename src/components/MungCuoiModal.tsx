import React from 'react';
import './MungCuoiModal.css';

interface MungCuoiModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MungCuoiModal: React.FC<MungCuoiModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='mungcuoi-modal-overlay' onClick={onClose}>
      <div
        className='mungcuoi-modal-content'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dropdown header */}
        <div className='mungcuoi-dropdown'>
          <span>Bạn sẽ đến chứ?</span>
          <span className='dropdown-arrow'>▼</span>
        </div>

        {/* Close button */}
        <button className='mungcuoi-close-btn' onClick={onClose}>
          ×
        </button>

        {/* Couple photo */}
        <div className='mungcuoi-photo'>
          <img
            src='https://w.ladicdn.com/s600x700/6322a62f2dad980013bb5005/mieg0732-20250508125140-vy0br.jpg'
            alt='Couple photo'
          />
        </div>

        {/* QR Code section */}
        <div className='mungcuoi-qr-section'>
          <div className='qr-container'>
            <div className='qr-item'>
              <div className='qr-code-wrapper'>
                <div className='qr-code-placeholder'>
                  {/* QR Code pattern simulation */}
                  <div className='qr-pattern'></div>
                </div>
              </div>
              <div className='qr-info'>
                <h4>Le Nguyen Que Nhu</h4>
                <p>Techcombank</p>
                <p className='account-number'>19035517277011</p>
              </div>
            </div>

            <div className='qr-item'>
              <div className='qr-code-wrapper'>
                <div className='qr-code-placeholder'>
                  {/* QR Code pattern simulation */}
                  <div className='qr-pattern'></div>
                </div>
              </div>
              <div className='qr-info'>
                <h4>Dang Quang Vu Hoang</h4>
                <p>Vietcombank</p>
                <p className='account-number'>1037410057</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MungCuoiModal;
