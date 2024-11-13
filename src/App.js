
import './App.css';
import Banner from './Banner';
import Footer from './Footer';
import Header from './Header';
import RegistrationForm from './RegistrationForm';
import SupportGroupRegistrationForm from './SupportGroupRegistrationForm';

function App() {
  return (
    <div>
 {/* <Header/> */}
 <div className=''>
  <Header/>
  <Banner />
     <RegistrationForm />
     {/* <SupportGroupRegistrationForm/> */}
     <Footer />
   </div>
    </div>
   
  );
}

export default App;
