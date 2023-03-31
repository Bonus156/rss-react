import { NotFoundPage } from './pages/notFound';
import { AboutPage } from './pages/about';
import { HomePage } from './pages/homePage';
import { FormPage } from './pages/formPage';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Navigation,
  HomeTitle,
  AboutTitle,
  NotFoundTitle,
  FormTitle,
} from './components/navigation';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomeTitle />} />
          <Route path="about" element={<AboutTitle />} />
          <Route path="*" element={<NotFoundTitle />} />
          <Route path="/form" element={<FormTitle />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/form" element={<FormPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
