import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const SupportGroupRegistrationForm = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loader, setLoader] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    childFirstName: '',
    childAge: '',
    diagnosis: '',
    primaryCaregiver: '',
    groupChallenges: '',
    reasonsForJoining: '',
    goals: '',
    previousGroupParticipation: '',
    previousGroupDetails: '',
    paymentDate: '',
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'] },
    { title: 'Child’s Information', component: ChildInformation, fields: ['childFirstName', 'childAge', 'diagnosis', 'primaryCaregiver'] },
    { title: 'Support Needs and Group Preferences', component: GroupPreferences, fields: ['groupChallenges', 'reasonsForJoining', 'goals', 'previousGroupParticipation', 'previousGroupDetails'] },
    { title: 'Payment Information', component: PaymentInformation, fields: [] }, // No fields to validate
    { title: 'Confidentiality Agreement', component: ConfidentialityAgreement, fields: [] },
  ];
  const isSectionCompleted = (index) => completedSections.includes(index);

  const handleNextSection = () => {
    if (validateCurrentSection()) {
      setCompletedSections([...completedSections, activeSection]);
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const response = await axios.post(`https://admin.harmoniemente.com/api/public/support-group-registration`, formData);
      console.log(response);
      if (response.status === 200) {
        setLoader(false);
        Swal.fire({
          title: 'Success!',
          text: 'Your form has been submitted.',
          icon: 'success',
          confirmButtonText: 'Great',
        }).then(() => {
          window.location.href = 'https://book.carepatron.com/Harmonie-Mente-/All?p=jHVgIDhDTrOzfpa6dFuRjQ&i=PXBlk-X5';
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Close',
      });
      setLoader(false);
    }
  };

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };




  const validateCurrentSection = () => {
    const sectionFields = sections[activeSection].fields;
    let currentErrors = {};

    sectionFields.forEach((field) => {
      if (formData[field] === '' || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        currentErrors[field] = 'This field is required';
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const isFormComplete = () => {
    // Don't apply validation to PaymentInformation
    if (activeSection === sections.length - 1) {
      return true; // Automatically complete if it's the last section
    }
    return sections.every((section) => {
      return section.fields.every((field) => formData[field] !== '');
    });
  };

  const renderSection = () => {
    const SectionComponent = sections[activeSection].component;
    return <SectionComponent formData={formData} errors={errors} onChange={handleChange} />;
  };
  const renderNavigation = () => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sections.map((section, index) => (
            <div key={index}>
              <button
                disabled
                className={`px-2 py-1 w-full text-[12px] font-medium rounded-full ${activeSection === index ? 'bg-[#512cad] text-white' : isSectionCompleted(index) ? 'bg-[#c09a51] text-white' : 'bg-gray-200 text-gray-800'}`}
              >
                {isSectionCompleted(index) ? '✔' : ''} {section.title}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto p-6 bg-white rounded-lg">
      <p className='text-lg text-center text-[#512CAD] font-normal my-4'>Thank you for your interest in joining our monthly support group. Please complete the form below to register. We look forward to having you join our community.</p>

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
            >
              Previous
            </button>
          )}
          {activeSection < sections.length - 1 ? (
            <button
              className="px-4 py-2 bg-[#c09a51] text-white rounded-md"
              onClick={handleNextSection}
            >
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-[#c09a51] text-white rounded-md"
              onClick={handleSubmit}
              disabled={!isFormComplete()}
            >
              {`${loader ? "please wait..." : "submit"}`}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 w-full grid grid-cols-1 lg:grid-cols-3 items-end gap-1 md:gap-2 mt-5">
    {['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className={`mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]`}
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Child's Information Section
const ChildInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 w-full grid grid-cols-1 lg:grid-cols-3 items-end gap-1 md:gap-2 mt-5">
    {['childFirstName', 'childAge', 'diagnosis', 'primaryCaregiver'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type={field === 'primaryCaregiver' || 'childFirstName' ? 'text' : 'number'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className={`mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]`}
          required
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Group Preferences Section
const GroupPreferences = ({ formData, errors, onChange }) => {
  // Define a mapping for the user-friendly field names
  const fieldLabels = {
    groupChallenges: 'What specific challenges or areas would you like to address in the group?',
    reasonsForJoining: 'Why are you interested in joining this support group?',
    goals: 'What would you hope to gain from participating in this support group?',
    previousGroupParticipation: 'Have you participated in similar support groups before?',
    previousGroupDetails: 'If yes, please specify',
  };

  return (
    <div className="space-y-4 my-3">
      {['groupChallenges', 'reasonsForJoining', 'goals', 'previousGroupParticipation', 'previousGroupDetails'].map((field) => (
        <div key={field}>
          <label className="block text-[12px] font-medium text-[#512cad]">
            {fieldLabels[field]} {/* Using the mapped label */}
          </label>
          <textarea
            value={formData[field]}
            onChange={(e) => onChange(field, e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-200 focus:outline-none rounded-md text-[12px]"
            required
          />
          {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
        </div>
      ))}
    </div>
  );
};


// Payment Information Section
const PaymentInformation = () => (
  <div className="my-3 space-y-2">
    <p className="text-[12px] font-medium text-[#512cad]">
      Monthly Support Group Fee: <span className="text-gray-700">$50</span>
    </p>
    <p className="text-[12px] font-medium text-[#512cad]">
      Payment Method: <span className="text-gray-700">Secure payment link (provided after registration)</span>
    </p>
  </div>
);



// Confidentiality Agreement Section
const ConfidentialityAgreement = () => (
  <div className="my-3">
    <p className="text-sm">By submitting this form, you agree to maintain the confidentiality of the group and adhere to its guidelines.</p>
  </div>
);

export default SupportGroupRegistrationForm;
