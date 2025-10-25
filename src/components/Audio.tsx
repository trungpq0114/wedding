import { useRef, useEffect, useState } from 'react';
import loadingGif from '/audio/music.gif';

export function Audio() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Auto play music when component mounts
    const playAudio = async () => {
      try {
        if (audioRef.current) {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch {
        console.log('Auto-play failed, user interaction required');
      }
    };

    playAudio();
  }, []);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch {
          console.log('Play failed');
        }
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src='/audio/nhac.mp3'
        loop
        preload='auto'
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />

      <div
        className='h-8 fixed z-[100] bottom-2 right-2 bg-[#1a6617] rounded-full flex items-center justify-center !pl-2 cursor-pointer hover:bg-[#2a7727] transition-colors'
        onClick={togglePlay}
      >
        <p className='ladi-headline1 uppercase text-white mr-2'>
          {isPlaying ? 'Pause' : 'Play'} Music
        </p>
        <img src={loadingGif} alt='Music' className={`w-10 h-10`} />
      </div>
    </>
  );
}
