import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { motion } from 'framer-motion';

interface RSVPFormProps {
  onSubmitSuccess?: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    attendance: '',
    guestName: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Add document to Firestore
      await addDoc(collection(db, 'rsvp'), {
        ...formData,
        timestamp: new Date(),
        createdAt: new Date().toISOString(),
      });

      setSubmitMessage(
        'Cảm ơn bạn đã xác nhận! Chúng tôi đã nhận được thông tin.'
      );

      // Reset form
      setFormData({
        name: '',
        attendance: '',
        guestName: '',
        message: '',
      });

      // Call success callback if provided
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className='rsvp-content'
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ overflow: 'hidden' }}
    >
      <motion.h2
        className='rsvp-title'
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách
        chu đáo nhất. Trân trọng!
      </motion.h2>

      {submitMessage && (
        <motion.div
          className={`submit-message ${
            submitMessage.includes('Cảm ơn') ? 'success' : 'error'
          }`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          {submitMessage}
        </motion.div>
      )}

      <motion.form
        className='rsvp-form'
        onSubmit={handleSubmit}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className='form-group'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <input
            type='text'
            name='name'
            placeholder='Tên của bạn'
            className='form-input'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </motion.div>

        <motion.div
          className='form-group'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.8, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <textarea
            name='message'
            placeholder='Gửi lời chúc đến cô dâu chú rể'
            className='form-textarea'
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </motion.div>

        <motion.div
          className='form-group'
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.0, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <select
            className='form-select'
            name='attendance'
            value={formData.attendance}
            onChange={handleInputChange}
            required
          >
            <option value=''>Bạn sẽ tham dự chứ?</option>
            <option value='yes'>Có, tôi sẽ tham dự</option>
            <option value='no'>Rất tiếc, tôi không thể tham dự</option>
          </select>
        </motion.div>

        <motion.div
          className='form-group'
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 1.2, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <select
            className='form-select'
            name='guestName'
            value={formData.guestName}
            onChange={handleInputChange}
            required
          >
            <option value=''>Bạn là khách mời của ai</option>
            <option value='1'>Cô dâu</option>
            <option value='2'>Chú rể</option>
          </select>
        </motion.div>

        <motion.button
          type='submit'
          className='submit-btn'
          disabled={isSubmitting}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isSubmitting ? 'Đang gửi...' : 'GỬI LỜI NHẮN'}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default RSVPForm;
