import React, { useState } from 'react';
import Header from './Header';
import axios from 'axios';
import Swal from 'sweetalert2';
import Loader from './Loader';
import logo from './assets/logo-1.02d0c49c0ba7696311e1.png'

const RegistrationForm = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    workshopTitle: '',
    workshopDate: '',
    workshopTime: '',
    location: '',
    emergencyName: '',
    emergencyRelationship: '',
    emergencyPhone: '',
    goals: '',
    previousWorkshops: '',
    workshopLevel: '',
    waiverAgreement: false,
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'dob', 'gender', 'phone', 'email', 'street', 'city', 'state', 'zip'] },
    { title: 'Workshop Details', component: WorkshopDetails, fields: ['workshopTitle', 'workshopDate', 'workshopTime', 'location'] },
    { title: 'Emergency Contact', component: EmergencyContact, fields: ['emergencyName', 'emergencyRelationship', 'emergencyPhone'] },
    { title: 'Workshop Preferences', component: WorkshopPreferences, fields: ['goals', 'previousWorkshops', 'workshopLevel'] },
    { title: 'Waiver and Consent', component: WaiverAndConsent, fields: ['waiverAgreement'] },
  ];

  // Handle Next Section
  const handleNextSection = () => {
    if (validateCurrentSection()) {
      // Mark current section as completed
      setCompletedSections([...completedSections, activeSection]);
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      }
    }
  };

  const handleSubmit = async () => {
    setLoader(true)
    const response = await axios.post(`https://admin.harmoniemente.com/api/public/contact-enquiry`, formData);
    console.log(response);
    if (response.status == 200) {
      setLoader(false);
      Swal.fire({
        title: 'Success!',
        text: 'Your form has been submitted.',
        icon: 'success',
        confirmButtonText: 'Great'
      }).then(() => {
        // Navigate to another URL after SweetAlert is closed
        window.location.href = 'https://book.carepatron.com/Harmonie-Mente-/All?p=jHVgIDhDTrOzfpa6dFuRjQ&i=dDw79KM7'; // Change '/thank-you' to your desired URL
      });
    }
  }

  // Handle Previous Section
  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  // Handle form field changes
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Validate current section
  const validateCurrentSection = () => {
    const sectionFields = sections[activeSection].fields;
    let currentErrors = {};
    sectionFields.forEach((field) => {
      if (formData[field] === '' || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        currentErrors[field] = 'This field is required';
      }
    });
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0; // Return true if no errors
  };

  // Check if a section is completed
  const isSectionCompleted = (index) => completedSections.includes(index);

  // Check if all required fields are filled to enable the Submit button
  const isFormComplete = () => {
    return sections.every((section) => {
      return section.fields.every((field) => {
        return formData[field] !== '' && !(field === 'waiverAgreement' && !formData[field]);
      });
    });
  };

  // Render the required section dynamically
  const renderSection = () => {
    if (loader) {
      return <Loader />
    }
    const SectionComponent = sections[activeSection].component;
    return <SectionComponent formData={formData} errors={errors} onChange={handleChange} />;
  };

  // Render the section navigation with lines and tick marks
  const renderNavigation = () => {
    if (loader) {
      return <Loader />
    }
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap  lg:flex-nowrap gap-2">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="items-center space-x-2 w-full">
                <button
                  disabled
                  className={`px-2 py-1 w-full text-[12px] font-medium rounded-full ${activeSection === index ? 'bg-[#512cad] text-white' : isSectionCompleted(index) ? 'bg-[#c09a51] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {isSectionCompleted(index) ? '✔' : ''} {section.title}
                </button>
                {/* Line between sections */}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto p-6 bg-white rounded-lg">
     
    <p className='text-lg text-center text-[#512CAD] font-normal my-4'>Thank you for your interest in participating in the Harmonie Mente workshop! Please fill out the form below to complete your registration. We look forward to welcoming you.</p>
   
      {/* Section Navigation with Lines */}
      {renderNavigation()}

      {/* Active Section */}
      <div className="">
        {renderSection()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-3">
          {activeSection > 0 && (
            <button
              className="px-4 py-2 bg-[#512cad] text-white rounded-md"
              onClick={handlePreviousSection}
              disabled={activeSection === 0}
            >
              Previous
            </button>
          )}
          {activeSection < sections.length - 1 ? (
            <button
              className="px-4 py-2 bg-[#c09a51] text-white rounded-md"
              onClick={handleNextSection}
              disabled={activeSection === sections.length - 1}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-[#c09a51] text-white rounded-md"
              onClick={handleSubmit}  // Replace with your form submission logic
              disabled={!isFormComplete()}
            >
              Submit
            </button>
          )}
        
        </div>
        <p className='text-[12px] text-left text-[#512CAD] my-3'>Please submit your completed registration  If you have any questions, feel free to contact us at info@harmoniemente.com</p>
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 w-full grid grid-cols-1 lg:grid-cols-3 items-end gap-1 md:gap-2 mt-5">
    {['fullName', 'dob', 'gender', 'phone', 'email', 'street', 'city', 'state', 'zip'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field}</label>
        <input
          type={field === 'dob' ? 'date' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className={`mt-1 block w-full p-1 bg-gray-200 ${field == 'dob' && 'text-[10px] text-gray-400'} focus:outline-none rounded-md text-[12px]`}
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Workshop Details Section
const WorkshopDetails = ({ formData, errors, onChange }) => (
  <div className="space-y-4 flex flex-wrap gap-2 items-end">
    {['workshopTitle', 'workshopDate', 'workshopTime', 'location'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field}</label>
        <input
          type={field === 'workshopDate' ? 'date' : field === 'workshopTime' ? 'time' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className={`mt-1 block w-full p-1 bg-gray-200 ${field == 'workshopDate' && 'text-[10px] text-gray-400'} ${field == 'workshopTime' && 'text-[10px] text-gray-400'} focus:outline-none rounded-md text-[12px]`}
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Emergency Contact Section
const EmergencyContact = ({ formData, errors, onChange }) => (
  <div className="space-y-4 flex flex-wrap gap-2 items-end">
    {['emergencyName', 'emergencyRelationship', 'emergencyPhone'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field}</label>
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Workshop Preferences Section
const WorkshopPreferences = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-[12px] font-medium text-[#512cad]">Do you have any specific goals for the workshop?</label>
      <textarea
        value={formData['goals']}
        onChange={(e) => onChange('goals', e.target.value)}
        className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
        rows="4"
        required
      />
      {errors['goals'] && <p className="text-red-500 text-xs">{errors['goals']}</p>}
    </div>

    <div>
      <label className="block text-[12px] font-medium text-[#512cad]">Have you attended any previous Harmonie Mente workshops?</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="previousWorkshops"
          value="yes"
          checked={formData['previousWorkshops'] === 'yes'}
          onChange={(e) => onChange('previousWorkshops', e.target.value)}
        /> <span className='text-[12px] text-[#c09a51]'>Yes</span>
        <input
          type="radio"
          name="previousWorkshops"
          value="no"
          checked={formData['previousWorkshops'] === 'no'}
          onChange={(e) => onChange('previousWorkshops', e.target.value)}
        /> <span className='text-[12px] text-[#c09a51]'>No</span>
        {errors['previousWorkshops'] && <p className="text-red-500 text-xs">{errors['previousWorkshops']}</p>}
      </div>
    </div>

    <div>
      <label className="block text-[12px] font-medium text-[#512cad]">If yes, please specify the level:</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="workshopLevel"
          value="Beginner"
          checked={formData['workshopLevel'] === 'Beginner'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span className='text-[12px] text-[#c09a51]'>Beginner</span>
        <input
          type="radio"
          name="workshopLevel"
          value="Intermediate"
          checked={formData['workshopLevel'] === 'Intermediate'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span className='text-[12px] text-[#c09a51]'>Intermediate</span>
        <input
          type="radio"
          name="workshopLevel"
          value="Advanced"
          checked={formData['workshopLevel'] === 'Advanced'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span className='text-[12px] text-[#c09a51]'>Advanced</span>
        {errors['workshopLevel'] && <p className="text-red-500 text-xs">{errors['workshopLevel']}</p>}
      </div>
    </div>
  </div>
);

// Waiver and Consent Section
const WaiverAndConsent = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-[12px] font-medium text-[#512cad]">I agree to the waiver and terms</label>
      <input
        type="checkbox"
        checked={formData['waiverAgreement']}
        onChange={(e) => onChange('waiverAgreement', e.target.checked)}
        className="mt-1 text-[12px]"
        required
      />
      {errors['waiverAgreement'] && <p className="text-red-500 text-xs">{errors['waiverAgreement']}</p>}
    </div>
  </div>
);

export default RegistrationForm;
