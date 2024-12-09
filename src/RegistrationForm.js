import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

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
    zip: 'undefined',
    country: '',
    workshopTitle: 'undefined', // Fixed title as per new data
    location: 'undefined',
    emergencyName: 'undefined',
    emergencyRelationship: 'undefined',
    emergencyPhone: 'undefined',
    goals: '',
    workshopLevel: '',
    paymentDate: '',
    workshopTime:'undefined'
  });

  const [errors, setErrors] = useState({});
  const [completedSections, setCompletedSections] = useState([]);

  const sections = [
    { title: 'Personal Information', component: PersonalInformation, fields: ['fullName', 'dob', 'gender', 'phone', 'email', 'street', 'city', 'state', 'country'] },
    { title: 'Workshop Details', component: WorkshopDetails, fields: ['workshopTitle'] },
    // { title: 'Emergency Contact Name', component: EmergencyContact, fields: ['emergencyRelationship', 'emergencyPhone'] }, // updated fields here
    { title: 'Workshop Preferences', component: WorkshopPreferences, fields: ['goals', 'previousWorkshops', 'workshopLevel'] },
    { title: 'Payment Information', component: PaymentInformation, fields: [''] },
    { title: 'Waiver and Consent', component: WaiverAndConsent, fields: ['waiverAgreement'] },
  ];
  

  // Define the function to check if the section is completed
  const isSectionCompleted = (index) => completedSections.includes(index);

  // Handle Next Section
  // const handleNextSection = () => {
  //   if (validateCurrentSection()) {
  //     setCompletedSections([...completedSections, activeSection]);
  //     if (activeSection < sections.length - 1) {
  //       setActiveSection(activeSection + 1);
  //     }
  //   }
  // };
  const handleNextSection = () => {
    
      setCompletedSections([...completedSections, activeSection]);
      if (activeSection < sections.length - 1) {
        setActiveSection(activeSection + 1);
      }
   
  };


  const handleSubmit = async () => {
    try{
        setLoader(true)
        const transformedData = {
          ...formData,
          previousWorkshops: formData.previousWorkshops ? 'yes' : 'no',
          waiverAgreement: formData.waiverAgreement ? 'yes' : 'no',

        };
        const response = await axios.post(`https://admin.harmoniemente.com/api/public/contact-enquiry`,transformedData);
        console.log(response);
        if (response.status == 200) {
          setLoader(false);
          Swal.fire({
            title: 'Success!',
            text: 'Your form has been submitted.',
            icon: 'success',
            confirmButtonText: 'Proceed Your Schedule'
          }).then(() => {
            window.location.href = 'https://book.carepatron.com/Harmonie-Mente-/All?p=jHVgIDhDTrOzfpa6dFuRjQ&i=PXBlk-X5'; // Change '/thank-you' to your desired URL
          });
        }
    }catch(error){
        Swal.fire({
            title: 'error',
            text:error.response.data.message,
            icon: 'fail',
            confirmButtonText: 'close'
          })
          setLoader(false);
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
      if (field === 'workshopLevel' && formData.previousWorkshops !== 'Yes') return;

      if (formData[field] === '' || (Array.isArray(formData[field]) && formData[field].length === 0)) {
        currentErrors[field] = 'This field is required';
      }
    });

    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0; // Return true if no errors
  };

  // Check if all required fields are filled to enable the Submit button
  const isFormComplete = () => {
    return sections.every((section) => {
      return section.fields.every((field) => {
        if (field === 'waiverAgreement') {
          return formData[field] === true;
        }

        if (field === 'workshopLevel' && formData.previousWorkshops !== 'Yes') {
          return true;
        }

        return formData[field] !== ''; // Ensure all other fields are filled
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {sections.map((section, index) => (
            <React.Fragment key={index}>
              <div className="items-center space-x-2 w-full">
                <button
                  disabled
                  className={`px-2 py-1 w-full text-[12px] font-medium rounded-full ${activeSection === index ? 'bg-[#512cad] text-white' : isSectionCompleted(index) ? 'bg-[#c09a51] text-white' : 'bg-gray-200 text-gray-800'}`}
                >
                  {isSectionCompleted(index) ? '✔' : ''} {section.title}
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  };
  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto p-6 bg-white rounded-lg">
      <p className='text-lg text-center text-[#512CAD] font-normal my-4'>Thank you for your interest in joining the Mente Soin Workshop! Please complete the form below to finalize your registration. We look forward to welcoming you.</p>

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
              onClick={handleSubmit}
              
            >
              {`${loader ? "please wait..." : "submit"}`}
            </button>
          )}
        </div>
        {/* <p className='text-[16px] text-left text-[#512CAD] my-3'>Please submit your completed registration  If you have any questions, feel free to contact us at info@harmoniemente.com</p> */}
      </div>
    </div>
  );
};

// Personal Information Section
const PersonalInformation = ({ formData, errors, onChange }) => (
  <div className="space-y-2 w-full grid grid-cols-1 lg:grid-cols-3 items-end gap-1 md:gap-2 mt-5">
    {['fullName', 'dob', 'gender', 'phone', 'email', 'street', 'city', 'state', 'country'].map((field) => (
      <div key={field}>
        <label className="block text-[12px] font-medium text-[#512cad] capitalize">{field}</label>
        <input
          type={field === 'dob' ? 'date' : field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
          value={formData[field]}
          onChange={(e) => onChange(field, e.target.value)}
          className={`mt-1 block w-full p-1 bg-gray-200 ${field === 'dob' && 'text-[10px] text-gray-400'} focus:outline-none rounded-md text-[12px]`}
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
 <div>
  <label className="block text-[12px] font-medium text-[#512cad]">
    Workshop Title
  </label>
  <select
    className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
  >
    <option>Mindfulness and Stress Management Workshop</option>
    <option>Healing from Childhood Trauma</option>
    <option>Navigating Grief and Loss</option>
    <option>Relationship and Communication Skills Workshop</option>
    <option>Self-Compassion and Self-Acceptance</option>
    <option>Coping with Anxiety: Tools for Everyday Life</option>
    <option>Exploring Internal Family Systems (IFS)</option>
    <option>Mind-Body Connection: Integrating Somatic Practices in Therapy</option>
    <option>Resilience Building Workshop</option>
    <option>Exploring the Shadow: Embracing the Unseen Parts of Ourselves</option>
    <option>Addiction Recovery Workshop: Pathways to Healing</option>
    <option>Integrating Spirituality in Therapy</option>
    <option>Empowering Women: Building Confidence and Overcoming Limiting Beliefs</option>
    <option>The Art of Letting Go: Acceptance and Commitment Therapy (ACT) Workshop</option>
    <option>Men’s Mental Health: Breaking the Stigma</option>
  </select>
</div>

    {/* <div>
      <label className="block text-[12px] font-medium text-[#512cad]">Location</label>
      <input
        type="text"
        value={formData.location}
        onChange={(e) => onChange('location', e.target.value)}
        className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
      />
      {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
    </div> */}
  </div>
);

// Emergency Contact Section
const EmergencyContact = ({ formData, errors, onChange }) => {
    // Define a mapping for the user-friendly field names
    const fieldLabels = {
      // emergencyName: 'Emergency Contact Name',
      emergencyRelationship: 'Relationship to Participant',
      emergencyPhone: 'Phone Number',
    };
  
    return (
      <div className="space-y-2 w-full grid grid-cols-1 lg:grid-cols-3 items-start gap-1 md:gap-2 mt-5">
        {[ 'emergencyRelationship', 'emergencyPhone'].map((field) => (
          <div key={field}>
            {/* Use the mapping to display the user-friendly field name */}
            <label className="block text-[12px] font-medium text-[#512cad] capitalize">
              {fieldLabels[field]} {/* Using the mapped label */}
            </label>
            <input
              type={field === 'emergencyPhone' ? 'tel' : 'text'}
              value={formData[field]}
              onChange={(e) => onChange(field, e.target.value)}
              className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
            />
            {errors[field] && <p className="text-red-500 text-xs">{errors[field]}</p>}
          </div>
        ))}
      </div>
    );
  };
  

// Workshop Preferences Section
const WorkshopPreferences = ({ formData, errors, onChange }) => (
    <div className="space-y-4 my-3">
      <div>
        <label className="block text-[12px] font-medium text-[#512cad]">What specific goals do you have for this workshop?</label>
        <textarea
          value={formData.goals}
          onChange={(e) => onChange('goals', e.target.value)}
          className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
        ></textarea>
        {errors.goals && <p className="text-red-500 text-xs">{errors.goals}</p>}
      </div>
  
      <div>
        <label className="block text-[12px] font-medium text-[#512cad]">Have you attended any previous Mente Soin workshops?</label>
        <div className="mt-1 flex items-center gap-2">
          <label className="text-[12px] text-gray-700">
            <input
              type="radio"
              value="Yes"
              checked={formData.previousWorkshops === 'Yes'}
              onChange={(e) => onChange('previousWorkshops', e.target.value)}
              className="mr-1"
            />
            Yes
          </label>
          <label className="text-[12px] text-gray-700">
            <input
              type="radio"
              value="No"
              checked={formData.previousWorkshops === 'No'}
              onChange={(e) => onChange('previousWorkshops', e.target.value)}
              className="mr-1"
            />
            No
          </label>
        </div>
        {errors.previousWorkshops && <p className="text-red-500 text-xs">{errors.previousWorkshops}</p>}
      </div>
  
      {/* Conditionally render the "If yes, please specify" textarea */}
      {formData.previousWorkshops === 'Yes' && (
        <div>
          <label className="block text-[12px] font-medium text-[#512cad]">If yes, please specify</label>
          <textarea
            value={formData.workshopLevel}
            onChange={(e) => onChange('workshopLevel', e.target.value)}
            className="mt-1 block w-full p-1 bg-gray-200 focus:outline-none rounded-md text-[12px]"
            placeholder="Describe"
          ></textarea>
          {errors.workshopLevel && <p className="text-red-500 text-xs">{errors.workshopLevel}</p>}
        </div>
      )}
    </div>
  );
  
  
  

// Payment Information Section
const PaymentInformation = () => (
    <div className="space-y-2 w-full grid grid-cols-1 items-start gap-1 md:gap-2 mt-5">
      <div>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Workshop Fee:</label>
        <p className="mt-1 text-[50px] text-center text-[#c09a51] font-bold"> $200 </p>
      </div>
      <div>
        <label className="block text-[18px] text-center font-medium text-[#512cad]">Payment Method:</label>
        <p className="block text-[16px] text-center font-medium text-[#c09a51]">
          Secure payment link (provided upon registration)
        </p>
      </div>
    </div>
  );

// Waiver and Consent Section
const WaiverAndConsent = ({ formData, errors, onChange }) => (
    <div className="space-y-6 mt-6">
    <div className="bg-gray-100 p-4 rounded-lg">
      <p className="text-lg font-semibold text-[#512cad]">By registering for this workshop, you agree to the following:</p>
  
      <ul className="list-disc pl-5 mt-2 text-sm text-gray-700">
        <li className="mb-2">
          I understand that participation in this workshop may involve physical, mental, or emotional activities, and I take full responsibility for my well-being during the session.
        </li>
        <li className="mb-2">
          I consent to the use of photographs, video, and audio recordings made during the workshop for educational and development purposes. (Note: We ensure compliance with confidentiality regulations.)
        </li>
      </ul>
  
      <div className="mt-4">
        <label className="inline-flex items-center text-sm text-[#512cad]">
          <input
            type="checkbox"
            checked={formData.waiverAgreement}
            onChange={(e) => onChange('waiverAgreement', e.target.checked)}
            className="mr-2 rounded-md border-gray-300"
          />
          I agree to the terms and conditions.
        </label>
  
        {errors.waiverAgreement && (
          <p className="text-red-500 text-xs mt-1">{errors.waiverAgreement}</p>
        )}
      </div>
    </div>
  </div>
);

export default RegistrationForm;
