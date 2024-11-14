import './App.css';
import Banner from './Banner';
import FirstSection from './FirstSection';
import Footer from './Footer';
import Header from './Header';
import RegistrationForm from './RegistrationForm';
import SecondSection from './SecondSection';
import SupportGroupRegistrationForm from './SupportGroupRegistrationForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        
        <div>
          {/* Routing for Home Page Sections */}
          <Routes>
            <Route path="/" element={<FirstSection />} />
            <Route path="/support-group-registration" element={<SecondSection />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
