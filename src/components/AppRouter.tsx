import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import App from '../App';

const AppRouter: React.FC = () => {
  const location = useLocation();
  const pathLang = location.pathname.split('/')[1];
  
  // Default language for redirects
  const defaultLang = 'en';
  
  return (
    <Routes>
      {/* Redirect root to default language */}
      <Route path="/" element={<Navigate to={`/${defaultLang}`} replace />} />
      
      {/* Language-specific routes */}
      <Route path="/en" element={<App />} />
      <Route path="/zh" element={<App />} />
      <Route path="/es" element={<App />} />
      <Route path="/fr" element={<App />} />
      <Route path="/de" element={<App />} />
      <Route path="/ja" element={<App />} />
      <Route path="/ru" element={<App />} />
      <Route path="/ar" element={<App />} />
      <Route path="/mn" element={<App />} />
      <Route path="/zh-tw" element={<App />} />
      <Route path="/zh-hk" element={<App />} />
      
      {/* Catch all other routes and redirect to default language */}
      <Route path="*" element={<Navigate to={`/${defaultLang}`} replace />} />
    </Routes>
  );
};

export default AppRouter;