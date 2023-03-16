import { NotFoundPage } from './pages/notFound';
import { AboutPage } from './pages/about';
import { MainPage } from './pages/mainPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation } from './components/navigation';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
