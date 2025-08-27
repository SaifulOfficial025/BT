import React, { useEffect } from "react";

function ChildInformation({ formData, updateFormData, handleNext, handleBack, showLocationPopup, setShowLocationPopup, currentStep = 2, totalSteps = 5 }) {
  
  // Parse the number of children from the selection
  const getChildCount = () => {
    const childCount = formData.numberOfChildren || formData.childCount || "";
    if (childCount.includes("1 child")) return 1;
    if (childCount.includes("2 children")) return 2;
    if (childCount.includes("3 children")) return 3;
    if (childCount.includes("4")) return 4;
    return 0;
  };

  const childCount = getChildCount();

  // Initialize children details array when count changes
  useEffect(() => {
    const currentDetails = formData.childrenDetails || [];
    const newDetails = [];
    
    for (let i = 0; i < childCount; i++) {
      newDetails.push(currentDetails[i] || { age: "", gender: "" });
    }
    
    if (newDetails.length !== currentDetails.length) {
      updateFormData('childrenDetails', newDetails);
    }
  }, [childCount]);

  // Update child detail
  const updateChildDetail = (index, field, value) => {
    const currentDetails = formData.childrenDetails || [];
    const newDetails = [...currentDetails];
    if (!newDetails[index]) newDetails[index] = {};
    newDetails[index][field] = value;
    updateFormData('childrenDetails', newDetails);
  };

  // Check if form is complete
  const isFormComplete = () => {
    const requiredFields = ['preferredLanguage', 'country', 'state', 'city', 'zipCode', 'nationality', 'childcareType', 'numberOfChildren'];
    const basicFieldsComplete = requiredFields.every(field => 
      formData[field] || formData.childCount // fallback for numberOfChildren
    );
    
    const childrenDetailsComplete = (formData.childrenDetails || []).length === childCount &&
      (formData.childrenDetails || []).every(child => child.age && child.gender);
    
    return basicFieldsComplete && childrenDetailsComplete;
  };
  return (
    <>
      {showLocationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 font-sfpro">
          <div className="bg-white rounded-2xl shadow-xl w-[400px] max-w-full relative flex flex-col">
            
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl font-bold z-10"
              onClick={() => setShowLocationPopup(false)}
              aria-label="Close"
            >
              ×
            </button>

            {/* Full-width Image */}
            <img
              src="/mappopup.png"
              alt="Map Popup"
              className="w-full h-40 object-cover rounded-t-2xl"
            />

            {/* Content */}
            <div className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Enable your Location</h2>
              <p className="text-sm text-gray-500 mb-6 text-center">
                This app requires your location are turned on your devices and on this app. You must enable them on your phone settings
              </p>

              {/* Buttons */}
              <div className="w-full flex flex-col gap-4">
                <button
                  className="w-full py-3 rounded-md bg-[#0093d1] text-white text-lg font-medium hover:bg-[#007bb0] transition"
                  onClick={() => {
                    setShowLocationPopup(false);
                    // Trigger location permission logic here
                  }}
                >
                  Allow only while using this App
                </button>
                <button
                  className="w-full py-3 rounded-md border border-[#0093d1] text-[#0093d1] text-lg font-medium bg-white hover:bg-[#f0fbf9] transition"
                  onClick={() => setShowLocationPopup(false)}
                >
                  Don't allow this App
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100 font-sfpro">
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4 text-gray-500 hover:text-gray-700">
            ← 
          </button>
          <h3 className="text-lg text-gray-700 flex-1">Details</h3>
          
          <span className="text-lg text-[#0093d1] font-bold">Step {currentStep}</span> <span className="ml-2 text-lg text-gray-500"> of {totalSteps}</span>
        </div>
        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-800 mb-2">Details</h4>
          <p className="text-sm text-gray-500 mb-6">
            Kindly select options to help us understand your preferences
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center mb-4">
            <input 
              type="checkbox" 
              id="useLocation" 
              checked={formData.useCurrentLocation}
              onChange={(e) => updateFormData('useCurrentLocation', e.target.checked)}
              className="mr-3"
            />
            <label htmlFor="useLocation" className="text-sm text-gray-700">
              Use my current Location instead
            </label>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Language</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.preferredLanguage}
                onChange={(e) => updateFormData('preferredLanguage', e.target.value)}
              >
                <option>Select language</option>
                <option>English</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.country}
                onChange={(e) => updateFormData('country', e.target.value)}
              >
                <option>Select country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.state}
                onChange={(e) => updateFormData('state', e.target.value)}
              >
                <option>Select state</option>
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input 
                type="text" 
                placeholder="Input city"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.city}
                onChange={(e) => updateFormData('city', e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
              <input 
                type="text" 
                placeholder="Input zip code"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.zipCode}
                onChange={(e) => updateFormData('zipCode', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <input 
                type="text" 
                placeholder="Input nationality"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.nationality}
                onChange={(e) => updateFormData('nationality', e.target.value)}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6 mt-6">
            <h4 className="text-base font-medium text-gray-800 mb-2">Child Information</h4>
            <p className="text-sm text-gray-500 mb-6">Kindly select options to help us understand your preferences</p>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Childcare type</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                  value={formData.childcareType}
                  onChange={(e) => updateFormData('childcareType', e.target.value)}
                >
                  <option>Select option</option>
                  <option>Babysitter</option>
                  <option>Nanny</option>
                  {/* <option>Daycare</option> */}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Number of child(ren) that needs care</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                  value={formData.numberOfChildren || formData.childCount || ""}
                  onChange={(e) => {
                    updateFormData('numberOfChildren', e.target.value);
                    updateFormData('childCount', e.target.value); // backward compatibility
                  }}
                >
                  <option value="">Select option</option>
                  <option value="1 child">1 child</option>
                  <option value="2 children">2 children</option>
                  <option value="3 children">3 children</option>
                  <option value="4+ children">4+ children</option>
                </select>
              </div>
            </div>

            {/* Dynamic Child Details */}
            {childCount > 0 && (
              <div className="space-y-6">
                {Array.from({ length: childCount }, (_, index) => (
                  <div key={index} className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age of child {index + 1}
                      </label>
                      <input 
                        type="text" 
                        placeholder="DD-MM-YYYY"
                        className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.childrenDetails?.[index]?.age || ""}
                        onChange={(e) => updateChildDetail(index, 'age', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender of child {index + 1}
                      </label>
                      <select 
                        className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                        value={formData.childrenDetails?.[index]?.gender || ""}
                        onChange={(e) => updateChildDetail(index, 'gender', e.target.value)}
                      >
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

      

     

    

 

        </div>

        <button 
          onClick={handleNext}
          disabled={!isFormComplete()}
          className={`w-full text-lg font-medium py-3 rounded-md transition mt-8 ${
            isFormComplete() 
              ? "bg-[#0093d1] text-white hover:bg-[#007bb0]" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ChildInformation;
