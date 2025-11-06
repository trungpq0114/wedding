import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-photo-view/dist/react-photo-view.css';
import App3 from './App3.tsx';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' index element={<App3 />} />
        <Route path='/TheGroom' element={<App3 />} />
        <Route path='/TheBride' element={<App3 />} />
        <Route path='/*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
