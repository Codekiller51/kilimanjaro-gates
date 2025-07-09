import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { usePageTransition } from './hooks/usePageTransition';
import LoadingScreen from './components/common/LoadingScreen';
import PageTransition from './components/common/PageTransition';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Gallery from './pages/Gallery';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Profile from './pages/Profile';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import About from './pages/About';
import OurStory from './pages/about/OurStory';
import OurTeam from './pages/about/OurTeam';
import WhyChooseUs from './pages/about/WhyChooseUs';
import Testimonials from './pages/about/Testimonials';
import Certifications from './pages/about/Certifications';

function AppContent() {
  const { isLoading } = usePageTransition();

  return (
    <PageTransition isLoading={isLoading}>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tours/:category" element={<Tours />} />
            <Route path="/tours/:category/:id" element={<TourDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/about" element={<About />} />
            <Route path="/about/story" element={<OurStory />} />
            <Route path="/about/team" element={<OurTeam />} />
            <Route path="/about/why-choose-us" element={<WhyChooseUs />} />
            <Route path="/about/testimonials" element={<Testimonials />} />
            <Route path="/about/certifications" element={<Certifications />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </PageTransition>
  );
}

function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;