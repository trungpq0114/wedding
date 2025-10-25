import { motion } from 'framer-motion';
import { timelineEvents } from '../constants';

export function Timeline() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <section className='timeline-section !py-10 !px-5 overflow-hidden'>
      <motion.div
        className='timeline-content'
        variants={containerVariants}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className='timeline-events'>
          {timelineEvents.map((event, index) => (
            <motion.div
              key={index}
              className='timeline-event'
              variants={itemVariants}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <motion.div
                className='event-icon'
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{
                  scale: 1,
                  rotate: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: 'easeOut',
                  },
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <img src={event.icon} alt='Event icon' />
              </motion.div>
              <motion.div
                className='event-time min-w-[76px]'
                initial={{ opacity: 0, x: -30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1 + 0.2,
                    ease: 'easeOut',
                  },
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {event.time}
              </motion.div>
              <motion.div
                className='event-content'
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.5,
                    delay: index * 0.1 + 0.3,
                    ease: 'easeOut',
                  },
                }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <h4 className='event-title'>{event.title}</h4>
                <p className='event-description'>{event.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
