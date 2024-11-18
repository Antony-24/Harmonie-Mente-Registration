import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const WorkingProfessionalsSupportGroupForm = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [loader, setLoader] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContactMethod: '',
    preferredPronouns: '',
    country: 'undefined',
    currentOccupation: '',
    industry: '',
    topicsOfInterest: [], // Initialize as an empty array
    previousGroupParticipation: '',
    mainReasonsForJoining: [],
    sourceOfReferral: '',
    preferredMeetingTimes: [],
    agreementSigned: false,
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'email', 'phone', 'preferredContactMethod', 'preferredPronouns'] },
    // { title: 'Location', component: Location, fields: ['country'] },
    { title: 'Professional Background', component: ProfessionalBackground, fields: ['currentOccupation', 'industry'] },
    { title: 'Group Interest & Participation', component: GroupInterest, fields: ['topicsOfInterest', 'previousGroupParticipation', 'mainReasonsForJoining', 'sourceOfReferral'] },
    // { title: 'Availability', component: Availability, fields: ['preferredMeetingTimes'] },
    { title: 'Fee and Payment Information', component: PaymentInformation, fields: [] },
    { title: 'Confidentiality and Consent', component: ConfidentialityConsent, fields: ['agreementSigned'] },
    // { title: 'Emergency Contact Information', component: EmergencyContact, fields: ['emergencyContactName', 'emergencyContactRelationship', 'emergencyContactPhone'] },
  ];

  const handleNextSection = () => {
    const currentSectionFields = sections[activeSection].fields;
    let hasEmptyFields = false;
    let currentErrors = {};

    currentSectionFields.forEach((field) => {
      if (formData[field] === '' || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        hasEmptyFields = true;
        currentErrors[field] = 'This field is required';
      }
    });

    // Adjust agreementSigned validation to be less strict (optional)

    setErrors(currentErrors);

    if(formData.topicsOfInterest.length > 0){
      setActiveSection(activeSection + 1);
    }

    if (!hasEmptyFields) {
      setActiveSection(activeSection + 1);
      setCompletedSections([...completedSections, activeSection]);
      console.log('Moving to next section:', activeSection + 1);
    } else {
      console.error('Validation failed. Not moving to next section.');
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
      [field]: value,
    }));
  };

  const validateCurrentSection = () => {
    // This function can be used for additional validation logic if needed
  };



  const handleSubmit = async () => {
    if(!formData.agreementSigned){
      Swal.fire({
        title: 'Error',
        text: 'Sign the agreement',
        icon: 'error',
        confirmButtonText: 'Close',
      });
    } else{
      try {
        setLoader(true);
        const transformedData = { ...formData };
        const response = await axios.post('https://admin.harmoniemente.com/api/public/support-group-men', transformedData);
  
        if (response.status === 200) {
          Swal.fire({
            title: 'Success!',
            text: 'Your form has been submitted.',
            icon: 'success',
            confirmButtonText: 'Proceed Your Schedule',
          }).then(() => {
            window.location.href = 'https://book.carepatron.com/Harmonie-Mente-/All?p=jHVgIDhDTrOzfpa6dFuRjQ&i=h0Tuh.85';
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
      This program provides a safe, confidential, and supportive space for professional men to share experiences, navigate personal and work-related challenges, and foster meaningful connections with peers.
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
             
            >
              {loader ? 'Please wait...' : 'Submit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5">
    {['fullName', 'email', 'phone', 'preferredContactMethod', 'preferredPronouns'].map((field) => (
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

// Location Section
// const Location = ({ formData, errors, onChange }) => {
//   const countries = [
//     "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", 
//     "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", 
//     "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
//     "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", 
//     "Comoros", "Congo (Congo-Brazzaville)", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", 
//     "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", 
//     "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", 
//     "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", 
//     "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", 
//     "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", 
//     "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", 
//     "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", 
//     "Montenegro", "Morocco", "Mozambique", "Myanmar (Burma)", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", 
//     "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", 
//     "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", 
//     "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", 
//     "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
//     "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", 
//     "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", 
//     "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States of America", "Uruguay", "Uzbekistan", 
//     "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
//   ];

//   return (
//     <div className="space-y-2 mt-5">
//       <div>
//         <label className="block text-[12px] font-medium text-[#512cad]">
//           Country of Residence
//         </label>
//         <select
//           value={formData.country}
//           onChange={(e) => onChange("country", e.target.value)}
//           className="mt-1 block w-full p-1 bg-gray-200 rounded-md text-[12px]"
//         >
//           <option value="">Select a country</option>
//           {countries.map((country) => (
//             <option key={country} value={country.toLowerCase()}>
//               {country}
//             </option>
//           ))}
//         </select>
//         {errors.country && <p className="text-red-500 text-xs">{errors.country}</p>}
//       </div>
//     </div>
//   );
// };


// Professional Background Section
const ProfessionalBackground = ({ formData, errors, onChange }) => (
  <div className="space-y-2 grid grid-cols-1 lg:grid-cols-3 gap-2 mt-5">
    {['currentOccupation', 'industry'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 rounded-md text-[12px]"
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

// Group Interest Section
const GroupInterest = ({ formData, errors, onChange }) => {
  return (
    <div className="space-y-2 mt-5">
      <div>
        <label className="block text-[12px] font-medium text-[#512cad]">Topics of Interest</label>
        <div className="space-y-2">
          {['Balancing Work and Family', 'Managing Career Stress and Burnout', 'Mental Health and Wellbeing', 'Leadership and Personal Development', 'Workplace Conflicts', 'Coping with Work-Related Anxiety', 'Work-Life Balance', 'Addiction and Coping Strategies'].map((topic) => (
            <div key={topic} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.topicsOfInterest.includes(topic)}
                onChange={(e) => {
                  const updatedTopics = e.target.checked
                    ? [...formData.topicsOfInterest, topic]
                    : formData.topicsOfInterest.filter((t) => t !== topic);
                  onChange('topicsOfInterest', updatedTopics);
                  console.log('Updated topics:', updatedTopics); // Add debugging log
                }}
              />
              <span className="ml-2 text-[12px]">{topic}</span>
            </div>
          ))}
        </div>
      </div>
      {errors.topicsOfInterest && <p className="text-red-500 text-xs">{errors.topicsOfInterest}</p>}
    </div>
  );
};

// Availability Section
const Availability = ({ formData, errors, onChange }) => (
  <div className="space-y-2 mt-5">
    <div>
      <label className="block text-[12px] font-medium text-[#512cad]">Preferred Meeting Times</label>
      <div className="space-y-2">
        {['Weekdays (Morning)', 'Weekdays (Evening)', 'Weekends (Morning)', 'Weekends (Afternoon)', 'Weekends (Evening)'].map((time) => (
          <div key={time} className="flex items-center">
            <input
              type="checkbox"
              checked={formData.preferredMeetingTimes.includes(time)}
              onChange={(e) => {
                const updatedTimes = e.target.checked
                  ? [...formData.preferredMeetingTimes, time]
                  : formData.preferredMeetingTimes.filter((t) => t !== time);
                onChange('preferredMeetingTimes', updatedTimes);
              }}
            />
            <span className="ml-2 text-[12px]">{time}</span>
          </div>
        ))}
      </div>
    </div>
    {errors.preferredMeetingTimes && <p className="text-red-500 text-xs">{errors.preferredMeetingTimes}</p>}
  </div>
);

// Payment Section
const PaymentInformation = () => (
  <div className="space-y-2 mt-5">
    <div>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Workshop Fee:</label>
        <p className="mt-1 text-[50px] text-center text-[#c09a51] font-bold"> $70 </p>
      </div>
      <div>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Payment Method:</label>
        <p className="block text-[16px] text-center font-medium text-[#c09a51]">
         The fee covers all group sessions and access to additional resources.
        </p>
      </div>
  </div>
);

// Confidentiality Agreement Section
const ConfidentialityConsent = ({ formData, errors, onChange }) => (
  <div className="space-y-2 mt-5">
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={formData.agreementSigned}
        onChange={(e) => onChange('agreementSigned', e.target.checked)}
      />
      <label className="ml-2 text-[12px] text-[#512cad]">I agree to respect the privacy of all members and understand that all shared information is confidential.</label>
    </div>
    {errors.agreementSigned && <p className="text-red-500 text-xs">{errors.agreementSigned}</p>}
  </div>
);

// Emergency Contact Section
const EmergencyContact = ({ formData, errors, onChange }) => (
  <div className="space-y-2 mt-5">
    {['emergencyContactName', 'emergencyContactRelationship', 'emergencyContactPhone'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field.replace(/([A-Z])/g, ' $1').trim()}</label>
        <input
          type="text"
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 rounded-md text-[12px]"
        />
        {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
      </div>
    ))}
  </div>
);

export default WorkingProfessionalsSupportGroupForm;
