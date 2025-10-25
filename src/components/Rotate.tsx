import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export function Rotate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className='relative flex items-center justify-center'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={
          isInView
            ? {
                opacity: 1,
                rotateY: [90, -10, 10, 0],
                transition: {
                  duration: 1.2,
                  times: [0, 0.4, 0.7, 1],
                  ease: 'easeOut',
                },
              }
            : { opacity: 0 }
        }
      >
        <img
          src='/optimized/68-w1600.webp'
          alt='image'
          className='w-[291px]'
          loading='lazy'
        />
      </motion.div>
    </div>
  );
}
