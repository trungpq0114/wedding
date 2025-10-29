import React, { useState, useEffect } from 'react';
import {
  collection,
  getDocs,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

interface RSVPData {
  id: string;
  name: string;
  email: string;
  attendance: string;
  guestCount: string;
  message: string;
  timestamp: Timestamp | Date;
  createdAt?: string;
  active?: number;
}

const RSVPList: React.FC = () => {
  const [rsvpList, setRsvpList] = useState<RSVPData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'yes' | 'no'>('all');

  useEffect(() => {
    fetchRSVPData();
  }, []);

  const fetchRSVPData = async () => {
    try {
      setLoading(true);
      const q = query(collection(db, 'rsvp'), orderBy('timestamp', 'desc'));
      const querySnapshot = await getDocs(q);

      const rsvpData: RSVPData[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as RSVPData;
        // Chỉ thêm vào danh sách nếu active !== 0
        if (data.active !== 0) {
          rsvpData.push({
            ...data,
            id: doc.id,
          });
        }
      });

      setRsvpList(rsvpData);
      setError(null);
    } catch (err) {
      console.error('Error fetching RSVP data:', err);
      setError('Không thể tải danh sách RSVP. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  const filteredList = rsvpList.filter((rsvp) => {
    if (filter === 'all') return true;
    return rsvp.attendance === filter;
  });

  const getAttendanceText = (attendance: string) => {
    return attendance === 'yes' ? 'Sẽ tham dự' : 'Không tham dự';
  };

  const formatDate = (timestamp: Timestamp | Date) => {
    if (!timestamp) return '';
    const date =
      timestamp instanceof Timestamp ? timestamp.toDate() : timestamp;
    return date.toLocaleString('vi-VN');
  };

  if (loading) {
    return (
      <div className='rsvp-list-container'>
        <div className='loading'>Đang tải danh sách RSVP...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='rsvp-list-container'>
        <div className='error'>{error}</div>
        <button onClick={fetchRSVPData} className='retry-btn'>
          Thử lại
        </button>
      </div>
    );
  }

  return (
    <div className='rsvp-list-container'>
      <h2 className='rsvp-list-title'>Danh sách xác nhận tham dự</h2>

      <div className='filter-controls'>
        <label htmlFor='filter'>Lọc theo trạng thái:</label>
        <select
          id='filter'
          value={filter}
          onChange={(e) => setFilter(e.target.value as 'all' | 'yes' | 'no')}
          className='filter-select'
        >
          <option value='all'>Tất cả ({rsvpList.length})</option>
          <option value='yes'>
            Sẽ tham dự ({rsvpList.filter((r) => r.attendance === 'yes').length})
          </option>
          <option value='no'>
            Không tham dự (
            {rsvpList.filter((r) => r.attendance === 'no').length})
          </option>
        </select>
      </div>

      <div className='stats'>
        <div className='stat-item'>
          <span className='stat-label'>Tổng số RSVP:</span>
          <span className='stat-value'>{rsvpList.length}</span>
        </div>
        <div className='stat-item'>
          <span className='stat-label'>Sẽ tham dự:</span>
          <span className='stat-value'>
            {rsvpList.filter((r) => r.attendance === 'yes').length}
          </span>
        </div>
        <div className='stat-item'>
          <span className='stat-label'>Không tham dự:</span>
          <span className='stat-value'>
            {rsvpList.filter((r) => r.attendance === 'no').length}
          </span>
        </div>
        <div className='stat-item'>
          <span className='stat-label'>Tổng số khách:</span>
          <span className='stat-value'>
            {rsvpList
              .filter((r) => r.attendance === 'yes')
              .reduce((sum, r) => sum + parseInt(r.guestCount || '1'), 0)}
          </span>
        </div>
      </div>

      <div className='rsvp-list'>
        {filteredList.length === 0 ? (
          <div className='no-data'>
            {filter === 'all'
              ? 'Chưa có ai xác nhận tham dự.'
              : `Không có ai ${
                  filter === 'yes' ? 'sẽ tham dự' : 'không tham dự'
                }.`}
          </div>
        ) : (
          filteredList.map((rsvp) => (
            <div key={rsvp.id} className='rsvp-item'>
              <div className='rsvp-header'>
                <h3 className='rsvp-name'>{rsvp.name}</h3>
                <span className={`attendance-badge ${rsvp.attendance}`}>
                  {getAttendanceText(rsvp.attendance)}
                </span>
              </div>

              <div className='rsvp-details'>
                <div className='detail-item'>
                  <span className='detail-label'>Email:</span>
                  <span className='detail-value'>{rsvp.email}</span>
                </div>
                <div className='detail-item'>
                  <span className='detail-label'>Số người:</span>
                  <span className='detail-value'>{rsvp.guestCount}</span>
                </div>
                <div className='detail-item'>
                  <span className='detail-label'>Thời gian:</span>
                  <span className='detail-value'>
                    {formatDate(rsvp.timestamp)}
                  </span>
                </div>
              </div>

              {rsvp.message && (
                <div className='rsvp-message'>
                  <span className='message-label'>Lời chúc:</span>
                  <p className='message-text'>{rsvp.message}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <button onClick={fetchRSVPData} className='refresh-btn'>
        Làm mới danh sách
      </button>
    </div>
  );
};

export default RSVPList;
