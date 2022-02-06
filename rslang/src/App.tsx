import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import Navigation from './components/Navigation';
import About from './pages/About';
import AudioCallGame from './pages/AudioCallGame';
import Authorization from './pages/Authorization';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import SprintGame from './pages/SprintGame';
import Statistics from './pages/Statistics';
import Textbook from './pages/Textbook';
import Form from './components/Form';

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/authorization" element={<Form />} />
        <Route path="/textbook" element={<Textbook />} />
        <Route path="/sprint" element={<SprintGame />} />
        <Route path="/audiocall" element={<AudioCallGame />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
