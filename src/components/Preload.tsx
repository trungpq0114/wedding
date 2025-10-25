import { useState, useEffect } from 'react';

const imagesToPreload = [
  '/audio/music.gif',
  '/icon/heart.png',
  '/icon/map.png',
  '/icon/thao.webp',
  '/icon/trung.webp',
  '/one.png',
  '/optimized/10-w1600.webp',
  '/optimized/11-w1600.webp',
  '/optimized/12-w1600.webp',
  '/optimized/13-w1600.webp',
  '/optimized/15-w1600.webp',
  '/optimized/16-w1600.webp',
  '/optimized/17-w1600.webp',
  '/optimized/18-w1600.webp',
  '/optimized/19-w1600.webp',
  '/optimized/20-w1600.webp',
  '/optimized/21-w1600.webp',
  '/optimized/22-w1600.webp',
  '/optimized/23-w1600.webp',
  '/optimized/24-w1600.webp',
  '/optimized/25-w1600.webp',
  '/optimized/26-w1600.webp',
  '/optimized/27-w1600.webp',
  '/optimized/28-w1600.webp',
  '/optimized/29-w1600.webp',
  '/optimized/3-w1600.webp',
  '/optimized/30-w1600.webp',
  '/optimized/31-w1600.webp',
  '/optimized/32-w1600.webp',
  '/optimized/33-w1600.webp',
  '/optimized/34-w1600.webp',
  '/optimized/35-w1600.webp',
  '/optimized/36-w1600.webp',
  '/optimized/37-w1600.webp',
  '/optimized/38-w1600.webp',
  '/optimized/39-w1600.webp',
  '/optimized/4-w1600.webp',
  '/optimized/40-w1600.webp',
  '/optimized/41-w1600.webp',
  '/optimized/42-w1600.webp',
  '/optimized/5-w1600.webp',
  '/optimized/58-w1600.webp',
  '/optimized/59-w1600.webp',
  '/optimized/6-w1600.webp',
  '/optimized/60-w1600.webp',
  '/optimized/61-w1600.webp',
  '/optimized/62-w1600.webp',
  '/optimized/63-w1600.webp',
  '/optimized/7-w1600.webp',
  '/optimized/75-w1600.webp',
  '/optimized/76-w1600.webp',
  '/optimized/8-w1600.webp',
  '/optimized/9-w1600.webp',
  '/ss.png',
];

interface PreloadProps {
  onComplete: () => void;
}

export function Preload({ onComplete }: PreloadProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [totalImages] = useState(imagesToPreload.length);
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const preloadImages = async () => {
      let loadedCount = 0;

      const loadPromises = imagesToPreload.map((src) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setLoadingProgress((loadedCount / totalImages) * 100);
            resolve();
          };
          img.onerror = () => {
            reject(new Error(`Failed to load: ${src}`));
          };
          img.src = src;
        });
      });

      try {
        await Promise.all(loadPromises);
        setIsComplete(true);
      } catch (error) {
        console.error('Image preload error:', error);
        setHasError(true);
        setErrorMessage(
          error instanceof Error ? error.message : 'Unknown error occurred'
        );
      }
    };

    preloadImages();
  }, [totalImages]);

  const handleEnter = () => {
    if (isComplete && !hasError) {
      onComplete();
    }
  };

  const handleRetry = () => {
    window.location.reload();
  };

  return (
    <div className='preload-container'>
      <div className='preload-content'>
        <div className='preload-logo'>
          <h1 className='preload-title'>Quang Trung & Phương Thảo</h1>
          <p className='preload-subtitle'>Wedding Day</p>
        </div>

        <div className='preload-progress'>
          {!hasError ? (
            <>
              <div className='progress-bar'>
                <div
                  className='progress-fill'
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              <div className='flex items-center justify-center'>
                <span className='progress-percentage text-center'>
                  {Math.round(loadingProgress)}%
                </span>
              </div>

              {isComplete && (
                <button className='enter-btn' onClick={handleEnter}>
                  Xem thiệp mừng
                </button>
              )}
            </>
          ) : (
            <div className='error-section'>
              <div className='error-icon'>⚠️</div>
              <h3 className='error-title'>Không thể tải hình ảnh</h3>
              <p className='error-message'>{errorMessage}</p>
              <button className='retry-btn' onClick={handleRetry}>
                Thử lại
              </button>
            </div>
          )}
        </div>

        <div className='preload-footer'>
          <p>Đang chuẩn bị trải nghiệm tuyệt vời cho bạn...</p>
        </div>
      </div>
    </div>
  );
}
