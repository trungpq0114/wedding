# Firebase Setup for Wedding RSVP

## Bước 1: Tạo Firebase Project

1. Truy cập [Firebase Console](https://console.firebase.google.com)
2. Nhấn "Create a project" hoặc "Add project"
3. Đặt tên project (ví dụ: "wedding-rsvp")
4. Có thể bỏ qua Google Analytics nếu không cần

## Bước 2: Thiết lập Firestore Database

1. Trong Firebase Console, chọn "Firestore Database"
2. Nhấn "Create database"
3. Chọn "Start in test mode" (để dễ test, sau này có thể thay đổi rules)
4. Chọn location gần nhất (asia-southeast1 cho Việt Nam)

## Bước 3: Thêm Web App

1. Trong Project Overview, nhấn icon web (</>)
2. Đặt tên app (ví dụ: "wedding-website")
3. Có thể bỏ qua Firebase hosting
4. Copy config object

## Bước 4: Cập nhật Firebase Config

Mở file `src/firebase.ts` và thay thế config với thông tin từ Firebase:

```javascript
const firebaseConfig = {
  apiKey: 'your-api-key-here',
  authDomain: 'your-project-id.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project-id.appspot.com',
  messagingSenderId: 'your-sender-id',
  appId: 'your-app-id',
  measurementId: 'your-measurement-id',
};
```

## Bước 5: Kiểm tra Firestore Rules (Tùy chọn)

Trong Firestore > Rules, đảm bảo rules cho phép read/write:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true; // CHỈ dùng cho development!
    }
  }
}
```

**Lưu ý**: Rules trên chỉ dùng cho development. Trong production nên hạn chế quyền truy cập.

## Bước 6: Test Form

1. Chạy `npm start`
2. Điền form RSVP và submit
3. Kiểm tra Firestore Console để xem dữ liệu đã được lưu

## Cấu trúc dữ liệu trong Firestore

Collection: `rsvp`
Document fields:

- `name`: string
- `email`: string
- `attendance`: "yes" | "no"
- `guestCount`: "1" | "2" | "3" | "4"
- `message`: string
- `timestamp`: Firestore timestamp
- `createdAt`: ISO string

## Bảo mật (Production)

Khi deploy production, nên:

1. Cập nhật Firestore rules để hạn chế quyền truy cập
2. Thêm validation cho dữ liệu
3. Có thể thêm reCAPTCHA để chống spam
