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
    agreementSigned: false,
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'] },
    { title: 'Child’s Information', component: ChildInformation, fields: ['childFirstName', 'childAge', 'diagnosis', 'primaryCaregiver'] },
    { title: 'Support Needs and Group Preferences', component: GroupPreferences, fields: ['groupChallenges', 'reasonsForJoining', 'goals', 'previousGroupParticipation', 'previousGroupDetails'] },
    { title: 'Payment Information', component: PaymentInformation, fields: [] },
    { title: 'Confidentiality Agreement', component: ConfidentialityAgreement, fields: ['agreementSigned'] },
  ];

  const handleNextSection = () => {
    

      setCompletedSections([...completedSections, activeSection]);
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      
    }
  };

  const handlePreviousSection = () => {
    if (activeSection > 0) {
      setActiveSection(activeSection - 1);
    }
  };

const handleChange = (field, value) => {
  setFormData((prev) => ({
    ...prev,
    [field]: field === 'previousGroupParticipation' ? value : value,
  }));
};

  const validateCurrentSection = () => {
    const sectionFields = sections[activeSection].fields;
    let currentErrors = {};

    sectionFields.forEach((field) => {
      if (formData[field] === '' || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        currentErrors[field] = 'This field is required';
      }
    });

    if (activeSection === sections.length - 1 && !formData.agreementSigned) {
      currentErrors.agreementSigned = 'You must agree to the confidentiality agreement.';
    }

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const transformedData = {
        ...formData,
        previousGroupParticipation: formData.previousGroupParticipation ? 'yes' : 'no',
      };
      const response = await axios.post('https://admin.harmoniemente.com/api/public/support-group', transformedData);

      if (response.status === 200) {
        Swal.fire({
          title: 'Success!',
          text: 'Your form has been submitted.',
          icon: 'success',
          confirmButtonText: 'Great',
        }).then(() => {
          window.location.href = 'https://book.carepatron.com/Harmonie-Mente-/All?p=jHVgIDhDTrOzfpa6dFuRjQ&i=dDw79KM7';
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'Something went wrong.',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } finally {
      setLoader(false);
    }
  };

  const renderSection = () => {
    const SectionComponent = sections[activeSection].component;
    return <SectionComponent formData={formData} errors={errors} onChange={handleChange} />;
  };

  const renderNavigation = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {sections.map((section, index) => (
          <div key={index}>
            <button
              disabled
              className={`px-2 py-1 w-full text-[12px] font-medium rounded-full ${
                activeSection === index
                  ? 'bg-[#512cad] text-white'
                  : completedSections.includes(index)
                  ? 'bg-[#c09a51] text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              {completedSections.includes(index) ? '✔' : ''} {section.title}
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto p-6 bg-white rounded-lg">
      <p className="text-lg text-center text-[#512CAD] font-normal my-4">
        Thank you for your interest in joining our monthly support group. This group aims to provide a compassionate space for emotional support, shared experiences, and valuable resources for mothers raising children with special needs. Please complete the form below to register. We look forward to having you join our community.
      </p>

      {renderNavigation()}

      <div>
        {renderSection()}
        <div className="flex justify-between mt-3">
          {activeSection > 0 && (
            <button className="px-4 py-2 bg-[#512cad] text-white rounded-md" onClick={handlePreviousSection}>
              Previous
            </button>
          )}
          {activeSection < sections.length - 1 ? (
            <button className="px-4 py-2 bg-[#c09a51] text-white rounded-md" onClick={handleNextSection}>
              Next
            </button>
          ) : (
            <button
              className="px-4 py-2 bg-[#c09a51] text-white rounded-md"
              onClick={handleSubmit}
              disabled={loader || !formData.agreementSigned}
            >
              {loader ? 'Please wait...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5">
    {['fullName', 'email', 'phone', 'street', 'city', 'state', 'zip', 'country'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 rounded-md text-[12px]"
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

const ChildInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5">
    {['childFirstName', 'childAge', 'diagnosis', 'primaryCaregiver'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type={field === 'childAge' ? 'number' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 rounded-md text-[12px]"
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

const GroupPreferences = ({ formData, errors, onChange }) => {
  const fieldLabels = {
    groupChallenges: 'What specific challenges or areas would you like to address in the group?',
    reasonsForJoining: 'Why are you interested in joining this support group?',
    goals: 'What would you hope to gain from participating in this support group?',
    previousGroupParticipation: 'Have you participated in similar support groups before?',
    previousGroupDetails: 'If yes, please specify',
  };

  const handleYesNoChange = (value) => {
    onChange('previousGroupParticipation', value === 'yes');
    if (value !== 'yes') onChange('previousGroupDetails', '');
  };

  return (
    <div className="space-y-4 my-3">
      {['groupChallenges', 'reasonsForJoining', 'goals'].map((field) => (
        <div key={field}>
          <label className="block text-[12px] font-medium text-[#512cad]">{fieldLabels[field]}</label>
          <textarea
            value={formData[field]}
            onChange={(e) => onChange(field, e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-200 rounded-md text-[12px]"
          />
          {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
        </div>
      ))}

      <div>
        <label className="block text-[12px] font-medium text-[#512cad]">{fieldLabels.previousGroupParticipation}</label>
        <div className="mt-1 space-x-4">
          <label>
            <input
              type="radio"
              name="previousGroupParticipation"
              value="yes"
              checked={formData.previousGroupParticipation === true}
              onChange={() => handleYesNoChange('yes')}
            />{' '}
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="previousGroupParticipation"
              value="no"
              checked={formData.previousGroupParticipation === false}
              onChange={() => handleYesNoChange('no')}
            />{' '}
            No
          </label>
        </div>
        {errors.previousGroupParticipation && <p className="text-red-500 text-xs">{errors.previousGroupParticipation}</p>}
      </div>

      {formData.previousGroupParticipation && (
        <div>
          <label className="block text-[12px] font-medium text-[#512cad]">{fieldLabels.previousGroupDetails}</label>
          <textarea
            value={formData.previousGroupDetails}
            onChange={(e) => onChange('previousGroupDetails', e.target.value)}
            className="mt-1 block w-full p-2 bg-gray-200 rounded-md text-[12px]"
          />
          {errors.previousGroupDetails && <p className="text-red-500 text-xs">{errors.previousGroupDetails}</p>}
        </div>
      )}
    </div>
  );
};

const PaymentInformation = () => (
  <>
   <div className='my-5'>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Workshop Fee:</label>
        <p className="mt-1 text-[50px] text-center text-[#c09a51] font-bold"> $50 </p>
  </div>

      <div>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Payment Method:</label>
        <p className="block text-[16px] text-center font-medium text-[#c09a51]">
          Secure payment link (provided upon registration)
        </p>
      </div>
  </>
   
);

const ConfidentialityAgreement = ({ formData, onChange }) => (
  <div className="mt-5 space-y-2">
    <p className="text-[#512cad] text-[12px]">
      Confidentiality Agreement: All discussions in the support group will remain confidential and will not be shared outside the group.
    </p>
    <label className="flex items-center">
      <input
        type="checkbox"
        checked={formData.agreementSigned}
        onChange={(e) => onChange('agreementSigned', e.target.checked)}
      />
      <span className="ml-2 text-[12px] text-[#512cad]">I agree to the confidentiality agreement.</span>
    </label>
  </div>
);

export default SupportGroupRegistrationForm;
