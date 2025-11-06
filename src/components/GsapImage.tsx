import { motion } from 'framer-motion';

export function GsapImage() {
  return (
    <section className='relative w-full min-h-[200px] flex items-center justify-center overflow-hidden px-4'>
      <div className='grid grid-cols-2 w-full max-w-5xl gap-4 lg:gap-10'>
        <motion.img
          src='/optimized/76-w1600.webp'
          alt='image left'
          className='object-cover rounded-2xl shadow-lg'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        />

        <motion.img
          src='/optimized/75-w1600.webp'
          alt='image right'
          className='object-cover rounded-2xl shadow-lg'
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', duration: 1, bounce: 0.3 }}
          viewport={{ once: true, amount: 0.5 }}
        />
      </div>
    </section>
  );
}
