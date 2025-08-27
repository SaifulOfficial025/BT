import React from "react";

function TutoringInformation({ formData, updateFormData, handleNext, handleBack, showLocationPopup, setShowLocationPopup }) {
  return (
    <>
      {/* Location Popup */}
      {showLocationPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
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
            <img src="/mappopup.png" alt="Map Popup" className="w-full h-40 object-cover rounded-t-2xl" />
            {/* Content */}
            <div className="p-8 flex flex-col items-center">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2 text-center">Enable your Location</h2>
              <p className="text-sm text-gray-500 mb-6 text-center">
                This app requires your location to be turned on your device and within this app. Please enable it in your phone settings.
              </p>
              <div className="w-full flex flex-col gap-4">
                <button
                  className="w-full py-3 rounded-md bg-[#0093d1] text-white text-lg font-medium hover:bg-[#007bb0] transition"
                  onClick={() => {
                    setShowLocationPopup(false);
                    // trigger location permission logic here
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

      {/* Main Form Container */}
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button onClick={handleBack} className="mr-4 text-gray-500 hover:text-gray-700">←</button>
          <h3 className="text-lg text-gray-700 flex-1">Tutoring Information</h3>
          <span className="text-lg text-[#0093d1] font-bold">Step 2</span>
          <span className="ml-2 text-lg text-gray-500"> of 5</span>
        </div>

        <div className="mb-6">
          <h4 className="text-base font-medium text-gray-800 mb-2">Details</h4>
          <p className="text-sm text-gray-500 mb-6">
            Kindly provide details to help us match you with the right tutor.
          </p>
        </div>

        {/* Form Fields */}
        <div className="space-y-6">
          {/* Use Current Location */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="useLocation"
              checked={formData.useCurrentLocation}
              onChange={(e) => updateFormData("useCurrentLocation", e.target.checked)}
              className="mr-3"
            />
            <label htmlFor="useLocation" className="text-sm text-gray-700">
              Use my current Location instead
            </label>
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
              >
                <option>Select country</option>
                <option>United States</option>
                <option>Canada</option>
                <option>United Kingdom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
              <input
                type="text"
                placeholder="Input city"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.city}
                onChange={(e) => updateFormData("city", e.target.value)}
              />
            </div>
          </div>

          {/* State & Nationality */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
              >
                <option>Select state</option>
                <option>California</option>
                <option>New York</option>
                <option>Texas</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nationality</label>
              <input
                type="text"
                placeholder="Input nationality"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.nationality}
                onChange={(e) => updateFormData("nationality", e.target.value)}
              />
            </div>
          </div>

          {/* Zip Code */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
              <input
                type="text"
                placeholder="Input zip code"
                className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
                value={formData.zipCode}
                onChange={(e) => updateFormData("zipCode", e.target.value)}
              />
            </div>
          {/* Preferred Location */}
<div className="w-full">
  <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Location</label>
  <select
    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
    value={formData.preferredLocation || ""}
    onChange={(e) => updateFormData("preferredLocation", e.target.value)}
  >
    <option value="">Select preferred location</option>
    <option value="Home">Home</option>
    <option value="Online">Online</option>
    <option value="Tutor's Place">Tutor's Place</option>
    <option value="Any Location">Any Location</option>
  </select>
</div>

          </div>


          <hr className="my-6 border-gray-200" />

          {/* Tutoring Subjects & Learning Environment */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">What subject(s) need tutoring</label>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {["English", "Mathematics", "Basic science", "Phonetics", "Others"].map(subject => (
                  <label key={subject} className="flex items-center py-2 border-b last:border-b-0 border-gray-100">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.tutoringSubject?.includes(subject)}
                      onChange={(e) => {
                        let arr = formData.tutoringSubject || [];
                        updateFormData("tutoringSubject", e.target.checked ? [...arr, subject] : arr.filter(s => s !== subject));
                      }}
                    />
                    <span className="text-gray-700">{subject}</span>
                  </label>
                ))}
              </div>
            </div>

         <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    What is the learning environment needed
  </label>
  <select
    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
    value={formData.learningEnvironment || ""}
    onChange={(e) => updateFormData("learningEnvironment", e.target.value)}
  >
    <option value="">Select environment</option>
    <option value="Group lessons">Group lessons</option>
    <option value="Individual Tutoring">Individual Tutoring</option>
  </select>
</div>

          </div>

          {/* Learning Purpose & Student Age Range */}
          <div className="grid grid-cols-2 gap-6">
          <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    What is the purpose of this learning
  </label>
  <select
    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
    value={formData.learningPurpose || ""}
    onChange={(e) => updateFormData("learningPurpose", e.target.value)}
  >
    <option value="">Select purpose</option>
    <option value="Exam preparation">Exam preparation</option>
    <option value="Homework help">Homework help</option>
    <option value="Special needs tutoring">Special needs tutoring</option>
    <option value="Homeschooling (onsite)">Homeschooling (onsite)</option>
    <option value="Online Tutoring">Online Tutoring</option>
  </select>
</div>


            <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">Age range of student</label>
  <select
    className="w-full p-3 border border-gray-300 rounded-md bg-white text-gray-900"
    value={formData.studentAgeRange || ""}
    onChange={(e) => updateFormData("studentAgeRange", e.target.value)}
  >
    <option value="">Select age range</option>
    <option value="1 - 5 years">1 - 5 years</option>
    <option value="6 - 10 years">6 - 10 years</option>
    <option value="11 - 15 years">11 - 15 years</option>
    <option value="16 - 20 years">16 - 20 years</option>
    <option value="21 - 25 years">21 - 25 years</option>
    <option value="26 - 30 years">26 - 30 years</option>
    <option value="Above 30">Above 30</option>
  </select>
</div>

          </div>

          {/* Additional Care */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Care</label>
              <div className="bg-white rounded-lg border border-gray-200 p-4">
                {["Child Care", "Elderly Care"].map(care => (
                  <label key={care} className="flex items-center py-2 border-b last:border-b-0 border-gray-100">
                    <input
                      type="checkbox"
                      className="mr-2"
                      checked={formData.additionalCare?.includes(care)}
                      onChange={(e) => {
                        let arr = formData.additionalCare || [];
                        updateFormData("additionalCare", e.target.checked ? [...arr, care] : arr.filter(s => s !== care));
                      }}
                    />
                    <span className="text-gray-700">{care}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="w-full bg-[#0093d1] text-white text-lg font-medium py-3 rounded-md hover:bg-[#007bb0] transition mt-8"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default TutoringInformation;
