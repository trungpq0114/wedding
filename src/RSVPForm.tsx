import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

interface FormData {
  name: string;
  email: string;
  attendance: string;
  guestCount: string;
  message: string;
}

const RSVPForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    attendance: '',
    guestCount: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await addDoc(collection(db, 'rsvp'), {
        ...formData,
        active: 1,
        timestamp: new Date(),
      });

      setSubmitMessage(
        'Cảm ơn bạn đã xác nhận tham dự! Chúng tôi rất mong được gặp bạn.'
      );
      setFormData({
        name: '',
        email: '',
        attendance: '',
        guestCount: '',
        message: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      setSubmitMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='rsvp-content'>
      <h2 className='rsvp-title'>Xác nhận tham dự</h2>

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
          <input
            type='email'
            name='email'
            placeholder='Email'
            className='form-input'
            value={formData.email}
            onChange={handleInputChange}
            required
          />
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
            name='guestCount'
            value={formData.guestCount}
            onChange={handleInputChange}
            required
          >
            <option value=''>Số người tham dự</option>
            <option value='1'>1 người</option>
            <option value='2'>2 người</option>
            <option value='3'>3 người</option>
            <option value='4'>4 người</option>
          </select>
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

        <button type='submit' className='submit-btn' disabled={isSubmitting}>
          {isSubmitting ? 'Đang gửi...' : 'Gửi xác nhận'}
        </button>
      </form>
    </div>
  );
};

export default RSVPForm;
