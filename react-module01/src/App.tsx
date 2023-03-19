import { NotFoundPage } from './pages/notFound';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/homePage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Navigation, HomeTitle, AboutTitle, NotFoundTitle } from './components/navigation';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomeTitle />} />
          <Route path="about" element={<AboutTitle />} />
          <Route path="*" element={<NotFoundTitle />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
