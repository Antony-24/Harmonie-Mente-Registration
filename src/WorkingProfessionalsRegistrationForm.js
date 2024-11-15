import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const WorkingProfessionalsRegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredContactMethod: '',
    preferredPronouns: '',
    countryOfResidence: '',
    currentOccupation: '',
    industry: '',
    topicsOfInterest: [],
    participatedInSupportGroup: '',
    reasonsForJoining: [],
    heardAboutUs: '',
    preferredMeetingTimes: [],
    emergencyContactName: '',
    emergencyContactRelationship: '',
    emergencyContactPhone: '',
    confidentialityAgreement: false,
    paymentMethod: 'link', // Default to Stripe link
  });

  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleCheckboxChange = (field, value) => {
    if (formData[field].includes(value)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter((item) => item !== value),
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], value],
      });
    }
  };

  const handleSubmit = async () => {
    try {
      setLoader(true);
      const response = await axios.post(
        'https://your-api-url.com/register', 
        formData
      );
      if (response.status === 200) {
        setLoader(false);
        Swal.fire({
          title: 'Success!',
          text: 'Your registration has been submitted.',
          icon: 'success',
          confirmButtonText: 'Great',
        }).then(() => {
          window.location.href = 'https://payment-link-url.com';
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: error.response?.data?.message || 'An error occurred',
        icon: 'error',
        confirmButtonText: 'Close',
      });
      setLoader(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.preferredContactMethod)
      newErrors.preferredContactMethod = 'Preferred contact method is required';
    if (!formData.preferredPronouns)
      newErrors.preferredPronouns = 'Preferred pronouns are required';
    if (!formData.countryOfResidence) newErrors.countryOfResidence = 'Country is required';
    if (!formData.currentOccupation) newErrors.currentOccupation = 'Occupation is required';
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (formData.topicsOfInterest.length === 0)
      newErrors.topicsOfInterest = 'Please select at least one topic of interest';
    if (!formData.participatedInSupportGroup)
      newErrors.participatedInSupportGroup = 'Please answer if you participated in a support group before';
    if (!formData.reasonsForJoining.length)
      newErrors.reasonsForJoining = 'Please select at least one reason for joining';
    if (!formData.heardAboutUs) newErrors.heardAboutUs = 'Please tell us how you heard about us';
    if (!formData.emergencyContactName) newErrors.emergencyContactName = 'Emergency contact name is required';
    if (!formData.emergencyContactRelationship)
      newErrors.emergencyContactRelationship = 'Emergency contact relationship is required';
    if (!formData.emergencyContactPhone)
      newErrors.emergencyContactPhone = 'Emergency contact phone is required';
    if (!formData.confidentialityAgreement)
      newErrors.confidentialityAgreement = 'You must agree to the confidentiality agreement';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="max-w-[95%] md:max-w-[80%] mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-lg text-center text-[#512CAD] font-normal my-4">
        Working Professionals Men's Support Group Registration
      </h2>

      <div className="space-y-4">
        {/* Personal Information */}
        <div>
          <label className="block text-sm text-[#512cad]">Full Name:</label>
          <input
            type="text"
            value={formData.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.fullName && <p className="text-red-500 text-xs">{errors.fullName}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Email Address:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Phone Number:</label>
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Preferred Contact Method:</label>
          <select
            value={formData.preferredContactMethod}
            onChange={(e) => handleChange('preferredContactMethod', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          >
            <option value="">Select</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="whatsapp">WhatsApp</option>
          </select>
          {errors.preferredContactMethod && <p className="text-red-500 text-xs">{errors.preferredContactMethod}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Preferred Pronouns:</label>
          <select
            value={formData.preferredPronouns}
            onChange={(e) => handleChange('preferredPronouns', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          >
            <option value="">Select</option>
            <option value="he/him">He/Him</option>
            <option value="they/them">They/Them</option>
            <option value="other">Other</option>
          </select>
          {formData.preferredPronouns === 'other' && (
            <input
              type="text"
              value={formData.preferredPronouns}
              onChange={(e) => handleChange('preferredPronouns', e.target.value)}
              className="w-full p-2 bg-gray-200 rounded-md mt-2"
            />
          )}
          {errors.preferredPronouns && <p className="text-red-500 text-xs">{errors.preferredPronouns}</p>}
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-[#512cad]">Country of Residence:</label>
          <select
            value={formData.countryOfResidence}
            onChange={(e) => handleChange('countryOfResidence', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          >
            <option value="">Select Country</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            {/* Add other countries here */}
          </select>
          {errors.countryOfResidence && <p className="text-red-500 text-xs">{errors.countryOfResidence}</p>}
        </div>

        {/* Professional Background */}
        <div>
          <label className="block text-sm text-[#512cad]">Current Occupation:</label>
          <input
            type="text"
            value={formData.currentOccupation}
            onChange={(e) => handleChange('currentOccupation', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.currentOccupation && <p className="text-red-500 text-xs">{errors.currentOccupation}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Industry:</label>
          <input
            type="text"
            value={formData.industry}
            onChange={(e) => handleChange('industry', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.industry && <p className="text-red-500 text-xs">{errors.industry}</p>}
        </div>

        {/* Group Interest & Participation */}
        <div>
          <label className="block text-sm text-[#512cad]">Topics of Interest:</label>
          <div className="space-y-2">
            {[
              'Balancing Work and Family',
              'Managing Career Stress and Burnout',
              'Mental Health and Wellbeing',
              'Leadership and Personal Development',
              'Workplace Conflicts',
              'Coping with Work-Related Anxiety',
              'Work-Life Balance',
              'Addiction and Coping Strategies',
            ].map((topic) => (
              <div key={topic}>
                <input
                  type="checkbox"
                  checked={formData.topicsOfInterest.includes(topic)}
                  onChange={() => handleCheckboxChange('topicsOfInterest', topic)}
                />
                <span>{topic}</span>
              </div>
            ))}
            <input
              type="text"
              value={formData.topicsOfInterest.find((topic) => topic === 'Other')}
              onChange={(e) => handleChange('otherTopic', e.target.value)}
              className="w-full p-2 bg-gray-200 rounded-md"
              placeholder="Other (please specify)"
            />
          </div>
          {errors.topicsOfInterest && <p className="text-red-500 text-xs">{errors.topicsOfInterest}</p>}
        </div>

        {/* Reasons for Joining */}
        <div>
          <label className="block text-sm text-[#512cad]">Main Reasons for Joining:</label>
          <div className="space-y-2">
            {[
              'Seeking support',
              'Sharing experiences',
              'Learning coping strategies',
              'Building community',
              'Networking with professionals',
              'Personal growth and self-reflection',
            ].map((reason) => (
              <div key={reason}>
                <input
                  type="checkbox"
                  checked={formData.reasonsForJoining.includes(reason)}
                  onChange={() => handleCheckboxChange('reasonsForJoining', reason)}
                />
                <span>{reason}</span>
              </div>
            ))}
          </div>
          {errors.reasonsForJoining && <p className="text-red-500 text-xs">{errors.reasonsForJoining}</p>}
        </div>

        {/* Emergency Contact */}
        <div>
          <label className="block text-sm text-[#512cad]">Emergency Contact Name:</label>
          <input
            type="text"
            value={formData.emergencyContactName}
            onChange={(e) => handleChange('emergencyContactName', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.emergencyContactName && <p className="text-red-500 text-xs">{errors.emergencyContactName}</p>}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Emergency Contact Relationship:</label>
          <input
            type="text"
            value={formData.emergencyContactRelationship}
            onChange={(e) => handleChange('emergencyContactRelationship', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.emergencyContactRelationship && (
            <p className="text-red-500 text-xs">{errors.emergencyContactRelationship}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-[#512cad]">Emergency Contact Phone:</label>
          <input
            type="text"
            value={formData.emergencyContactPhone}
            onChange={(e) => handleChange('emergencyContactPhone', e.target.value)}
            className="w-full p-2 bg-gray-200 rounded-md"
          />
          {errors.emergencyContactPhone && <p className="text-red-500 text-xs">{errors.emergencyContactPhone}</p>}
        </div>

        {/* Confidentiality */}
        <div>
          <input
            type="checkbox"
            checked={formData.confidentialityAgreement}
            onChange={(e) => handleChange('confidentialityAgreement', e.target.checked)}
          />
          <label className="text-sm">I agree to the confidentiality agreement</label>
          {errors.confidentialityAgreement && (
            <p className="text-red-500 text-xs">{errors.confidentialityAgreement}</p>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loader}
            className={`w-full p-3 bg-[#512CAD] text-white rounded-lg font-bold ${
              loader ? 'bg-gray-400' : ''
            }`}
          >
            {loader ? 'Submitting...' : 'Submit Registration'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorkingProfessionalsRegistrationForm;
