
import './App.css';
import Header from './Header';
import RegistrationForm from './RegistrationForm';
import SupportGroupRegistrationForm from './SupportGroupRegistrationForm';

function App() {
  return (
    <div>
 <Header/>
 <div className='flex h-screen items-center justify-center'>
     <RegistrationForm />
     {/* <SupportGroupRegistrationForm/> */}
   </div>
    </div>
   
  );
}

export default App;
