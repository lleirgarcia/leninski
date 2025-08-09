import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import PortfolioOverview from './components/PortfolioOverview';
import NavigationCarousel from './components/NavigationCarousel';
import Footer from './components/Footer';
import PlanningSolution from './components/PlanningSolution';
import Drawings from './components/Drawings';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <PortfolioOverview />
              <NavigationCarousel />
              <Footer />
            </>
          } />
          <Route path="/planning-solution" element={<PlanningSolution />} />
          <Route path="/drawings" element={<Drawings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
