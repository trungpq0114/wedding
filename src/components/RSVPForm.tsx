import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface RSVPFormProps {
  onSubmitSuccess?: () => void;
}

const RSVPForm: React.FC<RSVPFormProps> = ({ onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    attendance: '',
    guestCount: '',
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
        email: '',
        attendance: '',
        guestCount: '',
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
    <div className='rsvp-content'>
      <h2 className='rsvp-title'>
        Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách
        chu đáo nhất. Trân trọng!
      </h2>

      {submitMessage && (
        <div
          className={`submit-message ${
            submitMessage.includes('Cảm ơn') ? 'success' : 'error'
          }`}
        >
          {submitMessage}
        </div>
      )}

      <form className='rsvp-form' onSubmit={handleSubmit}>
        <div className='form-group'>
          <input
            type='text'
            name='name'
            placeholder='Tên của bạn'
            className='form-input'
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='form-group'>
          <textarea
            name='message'
            placeholder='Gửi lời chúc đến cô dâu chú rể'
            className='form-textarea'
            value={formData.message}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div className='form-group'>
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
        </div>
        <div className='form-group'>
          <select
            className='form-select'
            name='guestName'
            value={formData.guestCount}
            onChange={handleInputChange}
            required
          >
            <option value=''>Bạn là khách mời của ai</option>
            <option value='1'>Cô dâu</option>
            <option value='2'>Chú rể</option>
          </select>
        </div>

        <button type='submit' className='submit-btn' disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'GỬI LỜI NHẮN'}
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
