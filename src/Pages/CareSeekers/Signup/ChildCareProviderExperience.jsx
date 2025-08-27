import React from "react";

function ChildCareProviderExperience({ formData, updateFormData, handleNext, currentStep = 3, totalSteps = 5 }) {
  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 font-sfpro">
      <div className="flex items-center mb-6">
        <button onClick={() => window.history.back()} className="mr-4 text-gray-500 hover:text-gray-700">←</button>
        <h3 className="text-lg text-gray-700 flex-1">Care provider Experience</h3>
        
  <span className="text-lg text-[#0093d1] font-bold">Step {currentStep}</span> <span className="ml-2 text-lg text-gray-500"> of {totalSteps}</span>
      </div>
      <div className="mb-6">
        <h4 className="text-base font-medium text-gray-800 mb-2">Details</h4>
        <p className="text-sm text-gray-500 mb-6">Kindly select options to help us understand your preferences</p>
      </div>

      <div className="space-y-8">
        <div>
          <p className="text-sm text-gray-700 mb-4">
            What qualities matter most to you in a care provider? <span className="font-normal">Select the ones that feel right.</span>
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4">
              {['Patient', 'Nurturing', 'Observant', 'Reliable', 'Empathetic', 'Friendly', 'Calm', 'Supportive'].map(quality => (
                <label key={quality} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2 bg-white text-gray-900"
                    checked={formData.careProviderQualities?.includes(quality)}
                    onChange={(e) => {
                      let arr = Array.isArray(formData.careProviderQualities) ? formData.careProviderQualities : [];
                      if (e.target.checked) {
                        updateFormData('careProviderQualities', [...arr, quality]);
                      } else {
                        updateFormData('careProviderQualities', arr.filter(q => q !== quality));
                      }
                    }}
                  />
                  <span className="text-sm text-gray-700">{quality}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-700 mb-4">
            What qualities matter most to you in a care provider? <span className="font-normal">Select the ones that feel right.</span>
          </p>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-4 gap-4">
              {['sleep-in', 'Non-smoker', 'Experience with autism', 'can drive',
                'Special needs experience', 'Experience with twins', 'Supportive', 'Speaks Yoruba Fluently',
                'Speaks Hausa Fluently', 'Sign language', 'Experience with speech delay', 'cook basic meals',
                'live-in', 'Behavioral support', 'Speaks French Fluently'].map(exp => (
                <label key={exp} className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="mr-2 bg-white text-gray-900"
                    checked={formData.careProviderExperience?.includes(exp)}
                    onChange={(e) => {
                      let arr = Array.isArray(formData.careProviderExperience) ? formData.careProviderExperience : [];
                      if (e.target.checked) {
                        updateFormData('careProviderExperience', [...arr, exp]);
                      } else {
                        updateFormData('careProviderExperience', arr.filter(q => q !== exp));
                      }
                    }}
                  />
                  <span className="text-sm text-gray-700">{exp}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-700 mb-4">
            Want your care provider to offer more than one type of care? <span className="font-normal">Select an extra category below.</span>
          </p>
          <select 
            className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
            value={formData.extraCareCategory}
            onChange={(e) => updateFormData('extraCareCategory', e.target.value)}
          >
            <option>Select category</option>
            <option>Child Care</option>
            <option>Tutoring</option>
            <option>Housekeeping</option>
          </select>
        </div>
      </div>

      <button 
        onClick={handleNext}
        className="w-full bg-[#0093d1] text-white text-lg font-medium py-3 rounded-md hover:bg-[#007bb0] transition mt-8"
      >
        Next
      </button>
    </div>
  );
}

export default ChildCareProviderExperience;
