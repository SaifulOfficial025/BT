import { useState } from "react";
import { useDispatch } from 'react-redux'
import { postJob } from '../../../Redux/BookaService'

function PublishButton({ formData = {} }) {
  const dispatch = useDispatch()
  const handlePublish = async () => {
    // Build payload from formData (basic mapping)
    const job_data = {
      service_category: (formData.careCategory || 'childcare').toLowerCase(),
      details: {
        location_information: {
          use_current_location: formData.useCurrentLocation || false,
          preferred_language: formData.preferredLanguage || 'English',
          country: formData.country || '',
          state: formData.state || '',
          city: formData.city || '',
          zip_code: formData.zipCode || '',
          nationality: formData.nationality || ''
        }
      },
      schedule: {
        job_type: (formData.scheduleType || 'Reoccurring').toLowerCase(),
        recurrence_pattern: {
          frequency: (formData.repeatFrequency || 'Weekly').toLowerCase(),
          days: formData.repeatDays || []
        }
      },
      budget: {
        price_min: parseFloat(formData.hourlyRateStart) || 25.0,
        price_max: parseFloat(formData.hourlyRateEnd) || 35.0
      },
      message_to_provider: formData.messageToProvider || ''
    }

    // Service-specific: housekeeping example
    if ((formData.housekeepingServices || []).length) {
      job_data.details.housekeeping_information = {
        kind_of_housekeeping: formData.housekeepingServices || [],
        size_of_your_house: formData.homeSize || '',
        number_of_bedrooms: formData.number_of_bedrooms || '',
        number_of_bathrooms: formData.number_of_bathrooms || '',
        number_of_toilets: formData.number_of_toilets || '',
        pets_present: formData.pets_present || 'No',
        specify_pet_present: formData.specify_pet_present || '',
        additional_care: formData.additionalCare || []
      }
    }

    const payload = {
      job_data,
      title: formData.previewTitle || '',
      summary: formData.previewSummary || '',
      skills_and_expertise: formData.skills || []
    }

    try {
      const resAction = await dispatch(postJob(payload))
      if (resAction.error) {
        alert('Publish failed: ' + JSON.stringify(resAction.payload || resAction.error))
      } else {
        alert('Success: ' + JSON.stringify(resAction.payload))
      }
    } catch (e) {
      alert('Unexpected error: ' + e.message)
    }
  }

  return (
    <div className="flex justify-end">
      <button
        onClick={handlePublish}
        className="bg-[#0093d1] text-white py-2 px-6 rounded-md font-semibold hover:bg-[#007bb0]"
      >
        Publish
      </button>
    </div>
  )
}
import SidebarSignup, { getStepsForCategory } from "./SidebarSignup";
import CareCategory from "./CareCategory";
import ChildInformation from "./ChildInformation";
import ElderlyInformation from "./ElderlyInformation";
import TutoringInformation from "./TutoringInformation";
import HousekeeperInformation from "./HousekeeperInformation";
import ChildCareProviderExperience from "./ChildCareProviderExperience";
import ElderlyCareProviderExperience from "./ElderlyCareProviderExperience";
import ChildTimeDetails from "./ChildTimeDetails";
import ElderlyTimeDetails from "./ElderlyTimeDetails";
import TutoringTimeDetails from "./TutoringTimeDetails";
import HouseKeepingTimeDetails from "./HouseKeepingTimeDetails";
import ChildSummary from "./ChildSummary";
import ElderlySummary from "./ElderlySummary";
import TutoringSummary from "./TutoringSummary";
import HousekeepingSummary from "./HousekeepingSummary";
import CareProvidersNearYou from "./CareProvidersNearYou";
// Email/password steps removed for BookingaService flow

function Signup() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  // Email/password steps removed for BookingaService flow
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  
  const [formData, setFormData] = useState({
    // Category
    careCategory: "",
    
    // Location data
    useCurrentLocation: false,
    country: "",
    state: "",
    city: "",
    zipCode: "",
    
    // Child care specific
    numberOfChildren: "",
    childrenDetails: [],
    
    // Elderly care specific
    elderlyCareType: "",
    relationshipWithElderly: "",
    ageOfElderly: "",
    genderOfElderly: "",
    healthCondition: "",
    otherHealthCondition: "",
    assistanceForm: "",
    
    // Tutoring specific
    tutoringSubjects: [],
    studentAge: "",
    currentGrade: "",
    
    // Housekeeping specific
    housekeepingServices: [],
    homeSize: "",
    cleaningFrequency: "",
    
    // Experience and preferences
    careProviderQualities: [],
    careProviderExperience: [],
    
    // Time details
    scheduleType: "Reoccurring",
    startDate: "",
    endDate: "",
    repeatEvery: "",
    repeatFrequency: "Weekly",
    repeatDays: [],
    startTime: "",
    endTime: "",
    hourlyRateStart: 80,
    hourlyRateEnd: 1230,
    
    // Summary
    messageToProvider: "",
    acceptedTerms: false,
    
    // Auth
    email: "",
    password: "",
    confirmPassword: ""
  });

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'useCurrentLocation' && value === true) {
      setShowLocationPopup(true);
    }
  };

  const handleNext = () => {
    const nextStep = getNextStep();
    if (nextStep) {
      setCurrentStep(nextStep);
    }
  };

  const handleBack = () => {
    const prevStep = getPreviousStep();
    if (prevStep) {
      setCurrentStep(prevStep);
    }
  };

  const getNextStep = () => {
    switch (selectedCategory) {
      case "Childcare":
        switch (currentStep) {
          case 1: return 2; // CareCategory → ChildInformation
          case 2: return 3; // ChildInformation → ChildCareProviderExperience
          case 3: return 4; // ChildCareProviderExperience → ChildTimeDetails
          case 4: return 5; // ChildTimeDetails → ChildSummary (final)
          case 5: return null; // Summary is final
          default: return null;
        }
      case "Elderly Care":
        switch (currentStep) {
          case 1: return 2; // CareCategory → ElderlyInformation
          case 2: return 3; // ElderlyInformation → ElderlyCareProviderExperience
          case 3: return 4; // ElderlyCareProviderExperience → ElderlyTimeDetails
          case 4: return 5; // ElderlyTimeDetails → ElderlySummary (final)
          case 5: return null; // Summary is final
          default: return null;
        }
      case "Tutoring":
        switch (currentStep) {
          case 1: return 2; // CareCategory → TutoringInformation
          case 2: return 3; // TutoringInformation → TutoringTimeDetails
          case 3: return 4; // TutoringTimeDetails → TutoringSummary (final)
          case 4: return null; // Summary is final
          default: return null;
        }
      case "Housekeeping":
        switch (currentStep) {
          case 1: return 2; // CareCategory → HousekeeperInformation
          case 2: return 3; // HousekeeperInformation → HouseKeepingTimeDetails
          case 3: return 4; // HouseKeepingTimeDetails → HousekeepingSummary (final)
          case 4: return null; // Summary is final
          default: return null;
        }
      default:
        // If no category is selected, only allow moving from step 1 to step 2
        return currentStep === 1 && selectedCategory ? 2 : null;
    }
  };

  const getPreviousStep = () => {
    return currentStep > 1 ? currentStep - 1 : null;
  };

  // Email/password popup handlers removed

  const renderStepContent = () => {
  const totalSteps = getStepsForCategory(selectedCategory).length;

  // Step 1 is always CareCategory
    if (currentStep === 1) {
      return (
        <CareCategory 
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          updateFormData={updateFormData}
          handleNext={handleNext}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    }

    // For subsequent steps, render based on selected category
    switch (selectedCategory) {
      case "Childcare":
        switch (currentStep) {
          case 2:
            return (
              <ChildInformation
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 3:
            return (
              <ChildCareProviderExperience
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 4:
            return (
              <ChildTimeDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 5:
            return (
              <ChildSummary
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 6:
            return (
              <CareProvidersNearYou
                formData={formData}
              />
            );
          default:
            return (
              <CareCategory 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                updateFormData={updateFormData}
                handleNext={handleNext}
              />
            );
        }
        
      case "Elderly Care":
        switch (currentStep) {
          case 2:
            return (
              <ElderlyInformation
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 3:
            return (
              <ElderlyCareProviderExperience
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 4:
            return (
              <ElderlyTimeDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 5:
            return (
              <ElderlySummary
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                  currentStep={currentStep}
                  totalSteps={totalSteps}
              />
            );
          case 6:
            return (
              <CareProvidersNearYou
                formData={formData}
              />
            );
          default:
            return (
              <CareCategory 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                updateFormData={updateFormData}
                handleNext={handleNext}
              />
            );
        }
        
      case "Tutoring":
        switch (currentStep) {
          case 2:
            return (
              <TutoringInformation
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
              />
            );
          case 3:
            return (
              <TutoringTimeDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 4:
            return (
              <TutoringSummary
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 5:
            return (
              <CareProvidersNearYou
                formData={formData}
              />
            );
          default:
            return (
              <CareCategory 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                updateFormData={updateFormData}
                handleNext={handleNext}
              />
            );
        }
        
      case "Housekeeping":
        switch (currentStep) {
          case 2:
            return (
              <HousekeeperInformation
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 3:
            return (
              <HouseKeepingTimeDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 4:
            return (
              <HousekeepingSummary
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            );
          case 5:
            return (
              <CareProvidersNearYou
                formData={formData}
              />
            );
          default:
            return (
              <CareCategory 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                updateFormData={updateFormData}
                handleNext={handleNext}
              />
            );
        }

      default:
        // Default fallback - always show CareCategory if no valid category is selected
        return (
          <CareCategory 
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            updateFormData={updateFormData}
            handleNext={handleNext}
          />
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <SidebarSignup 
        activeStep={currentStep} 
        selectedCategory={selectedCategory}
      />

      {/* Main Content */}
      <div 
        className="flex-1 flex items-center justify-center min-h-screen font-sfpro"
        style={{ marginLeft: '440px' }}
      >
        <div className="w-full flex flex-col items-center justify-center py-12 px-8">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center font-sfpro">
            Booking a service
          </h2>
          <div className="w-full flex justify-center">
            {renderStepContent()}
          </div>
          {/* Publish button shown on final step (Summary) */}
          {currentStep === getStepsForCategory(selectedCategory).length && (
            <div className="w-full max-w-4xl mx-auto mt-6">
              <PublishButton formData={formData} />
            </div>
          )}
        </div>
      </div>
      {/* Email/password popups removed for BookingaService flow */}
    </div>
  );
}

export default Signup;