import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './components/providers/DataProvider';
import About from './pages/About';
import AudioCallGame from './pages/AudioCallGame';
import Authorization from './pages/Authorization';
import Main from './pages/Main';
import NotFound from './pages/NotFound';
import SprintGame from './pages/SprintGame';
import Statistics from './pages/Statistics';
import Textbook from './pages/Textbook';
import WordsProvider from './components/providers/WordsProvider';
import Header from './components/Header';

function App() {
  return (
    <DataProvider>
      <WordsProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/authorization" element={<Authorization />} />
            <Route path="/textbook" element={<Textbook />} />
            <Route path="/sprint" element={<SprintGame />} />
            <Route path="/audiocall" element={<AudioCallGame />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </WordsProvider>
    </DataProvider>
  );
}

export default App;
