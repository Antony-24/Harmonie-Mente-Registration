import React, { useState, useEffect } from 'react';

const SupportGroupRegistrationForm = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    childFullName: '',
    childAge: '',
    childDiagnosis: '',
    primaryCaregiver: '',
    challenges: '',
    participationReason: '',
    gainExpectations: '',
    previousGroupParticipation: '',
    dietaryRestrictions: '',
    waiverAgreement: false,
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'] },
    { title: 'Child\'s Information', component: ChildInformation, fields: ['childFullName', 'childAge', 'childDiagnosis', 'primaryCaregiver', 'challenges'] },
    { title: 'Group Participation Preferences', component: GroupParticipationPreferences, fields: ['participationReason', 'gainExpectations', 'previousGroupParticipation', 'dietaryRestrictions'] },
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
        <div className="flex items-center">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center space-x-2">
                <button
                  className={`px-4 py-2 text-sm font-medium rounded-md ${activeSection === index ? 'bg-blue-500 text-white' : isSectionCompleted(index) ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'}`}
                  onClick={() => setActiveSection(index)}
                >
                  {isSectionCompleted(index) ? '✔' : ''} {section.title}
                </button>
                {/* Line between sections */}
                {index < sections.length - 1 && (
                  <div className={`h-px flex-1 ${isSectionCompleted(index) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold text-center mb-6">Harmonie Mente Monthly Online Support Group Registration</h1>
      <h2 className="text-lg font-medium text-center mb-6">For Mothers with Children with Special Needs</h2>

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
              onClick={() => alert('Form submitted!')}  // Replace with your form submission logic
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
    {['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'].map((field) => (
      <div key={field}>
        <label className="block text-sm font-medium text-gray-700 capitalize">{field}</label>
        <input
          type={field === 'email' ? 'email' : 'text'}
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

// Child's Information Section
const ChildInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    {['childFullName', 'childAge', 'childDiagnosis'].map((field) => (
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

    <div>
      <label className="block text-sm font-medium text-gray-700">Primary Caregiver</label>
      <div className="flex items-center space-x-4">
        {['Mother', 'Father', 'Other'].map((option) => (
          <div key={option}>
            <input
              type="radio"
              name="primaryCaregiver"
              value={option}
              checked={formData['primaryCaregiver'] === option}
              onChange={(e) => onChange('primaryCaregiver', e.target.value)}
            />
            <span>{option}</span>
          </div>
        ))}
        {errors['primaryCaregiver'] && <p className="text-red-500 text-xs">{errors['primaryCaregiver']}</p>}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Challenges/Areas to Address in Group</label>
      <textarea
        value={formData['challenges']}
        onChange={(e) => onChange('challenges', e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows="4"
        required
      />
      {errors['challenges'] && <p className="text-red-500 text-xs">{errors['challenges']}</p>}
    </div>
  </div>
);

// Group Participation Preferences Section
const GroupParticipationPreferences = ({ formData, errors, onChange }) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700">Why are you interested in joining this support group?</label>
      <textarea
        value={formData['participationReason']}
        onChange={(e) => onChange('participationReason', e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows="4"
        required
      />
      {errors['participationReason'] && <p className="text-red-500 text-xs">{errors['participationReason']}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">What would you hope to gain from participating in this group?</label>
      <textarea
        value={formData['gainExpectations']}
        onChange={(e) => onChange('gainExpectations', e.target.value)}
        className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
        rows="4"
        required
      />
      {errors['gainExpectations'] && <p className="text-red-500 text-xs">{errors['gainExpectations']}</p>}
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Have you participated in any similar support groups in the past?</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="previousGroupParticipation"
          value="yes"
          checked={formData['previousGroupParticipation'] === 'yes'}
          onChange={(e) => onChange('previousGroupParticipation', e.target.value)}
        /> <span>Yes</span>
        <input
          type="radio"
          name="previousGroupParticipation"
          value="no"
          checked={formData['previousGroupParticipation'] === 'no'}
          onChange={(e) => onChange('previousGroupParticipation', e.target.value)}
        /> <span>No</span>
        {errors['previousGroupParticipation'] && <p className="text-red-500 text-xs">{errors['previousGroupParticipation']}</p>}
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700">Do you have any dietary restrictions or allergies?</label>
      <div className="flex items-center space-x-4">
        <input
          type="radio"
          name="dietaryRestrictions"
          value="yes"
          checked={formData['dietaryRestrictions'] === 'yes'}
          onChange={(e) => onChange('dietaryRestrictions', e.target.value)}
        /> <span>Yes</span>
        <input
          type="radio"
          name="dietaryRestrictions"
          value="no"
          checked={formData['dietaryRestrictions'] === 'no'}
          onChange={(e) => onChange('dietaryRestrictions', e.target.value)}
        /> <span>No</span>
        {errors['dietaryRestrictions'] && <p className="text-red-500 text-xs">{errors['dietaryRestrictions']}</p>}
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

export default SupportGroupRegistrationForm;
