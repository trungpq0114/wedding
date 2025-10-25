import { motion } from 'framer-motion';

export function Title() {
  return (
    <div className='absolute bottom-30 left-0 right-0 z-10'>
      <motion.h1
        className='hero-title'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          delay: 0.3,
          ease: 'easeInOut',
        }}
      >
        Quang Trung
      </motion.h1>

      <div className='flex items-center justify-center'>
        <motion.p
          className='hero-ampersand'
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.8,
            ease: 'easeInOut',
          }}
        >
          &
        </motion.p>

        <motion.h1
          className='hero-title'
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: 1.2,
            ease: 'easeInOut',
          }}
        >
          Phương Thảo
        </motion.h1>
      </div>
    </div>
  );
}
