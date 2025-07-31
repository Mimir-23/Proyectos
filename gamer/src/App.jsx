import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';

// Pages
import Home from './pages/Home';
import Popular from './pages/Popular';
import NewReleases from './pages/NewReleases';
import Genres from './pages/Genres';
import Search from './pages/Search';
import GameDetails from './pages/GameDetails';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text transition-colors duration-300">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/popular" element={<Popular />} />
                <Route path="/new-releases" element={<NewReleases />} />
                <Route path="/genres" element={<Genres />} />
                <Route path="/search" element={<Search />} />
                <Route path="/games/:id" element={<GameDetails />} />
              </Routes>
            </main>
            
            <Footer />
          </div>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
