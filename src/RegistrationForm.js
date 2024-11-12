import React, { useState } from 'react';

const RegistrationForm = () => {
  const [activeSection, setActiveSection] = useState(0);
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
    const SectionComponent = sections[activeSection].component;
    return <SectionComponent formData={formData} errors={errors} onChange={handleChange} />;
  };

  // Render the section navigation with lines and tick marks
  const renderNavigation = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-wrap  lg:flex-nowrap gap-2">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="items-center space-x-2 my-2">
                <button
                  className={`px-4 py-1 text-[12px] font-medium rounded-full ${activeSection === index ? 'bg-blue-500 text-white' : isSectionCompleted(index) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveSection(index)}
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
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-left text-sm font-normal">Harmonie Mente Workshop Registration</h1>

      {/* Section Navigation with Lines */}
      {renderNavigation()}

      {/* Active Section */}
      <div className="mt-6">
        {renderSection()}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          {activeSection > 0 && (
            <button
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              onClick={handlePreviousSection}
              disabled={activeSection === 0}
            >
              Previous
            </button>
          )}
          {activeSection < sections.length - 1 ? (
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleNextSection}
              disabled={activeSection === sections.length - 1}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-green-500 text-white rounded-md"
              onClick={() => console.log(formData,'Form Data')}  // Replace with your form submission logic
              disabled={!isFormComplete()}
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    {['fullName', 'dob', 'gender', 'phone', 'email', 'street', 'city', 'state', 'zip'].map((field) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
        <input
          type={field === 'dob' ? 'date' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Workshop Details Section
const WorkshopDetails = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    {['workshopTitle', 'workshopDate', 'workshopTime', 'location'].map((field) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
        <input
          type={field === 'workshopDate' ? 'date' : field === 'workshopTime' ? 'time' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Emergency Contact Section
const EmergencyContact = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    {['emergencyName', 'emergencyRelationship', 'emergencyPhone'].map((field) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
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
      <label className="block text-sm font-medium text-gray-700">Do you have any specific goals for the workshop?</label>
      <textarea
        value={formData['goals']}
        onChange={(e) => onChange('goals', e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows="4"
        required
      />
      {errors['goals'] && <p className="text-red-500 text-xs">{errors['goals']}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Have you attended any previous Harmonie Mente workshops?</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="previousWorkshops"
          value="yes"
          checked={formData['previousWorkshops'] === 'yes'}
          onChange={(e) => onChange('previousWorkshops', e.target.value)}
        /> <span>Yes</span>
        <input
          type="radio"
          name="previousWorkshops"
          value="no"
          checked={formData['previousWorkshops'] === 'no'}
          onChange={(e) => onChange('previousWorkshops', e.target.value)}
        /> <span>No</span>
        {errors['previousWorkshops'] && <p className="text-red-500 text-xs">{errors['previousWorkshops']}</p>}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">If yes, please specify the level:</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="workshopLevel"
          value="Beginner"
          checked={formData['workshopLevel'] === 'Beginner'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span>Beginner</span>
        <input
          type="radio"
          name="workshopLevel"
          value="Intermediate"
          checked={formData['workshopLevel'] === 'Intermediate'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span>Intermediate</span>
        <input
          type="radio"
          name="workshopLevel"
          value="Advanced"
          checked={formData['workshopLevel'] === 'Advanced'}
          onChange={(e) => onChange('workshopLevel', e.target.value)}
        /> <span>Advanced</span>
        {errors['workshopLevel'] && <p className="text-red-500 text-xs">{errors['workshopLevel']}</p>}
      </div>
    </div>
  </div>
);

// Waiver and Consent Section
const WaiverAndConsent = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">I agree to the waiver and terms</label>
      <input
        type="checkbox"
        checked={formData['waiverAgreement']}
        onChange={(e) => onChange('waiverAgreement', e.target.checked)}
        className="mt-1"
        required
      />
      {errors['waiverAgreement'] && <p className="text-red-500 text-xs">{errors['waiverAgreement']}</p>}
    </div>
  </div>
);

export default RegistrationForm;
