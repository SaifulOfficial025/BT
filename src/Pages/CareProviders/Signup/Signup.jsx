import React, { useState } from "react";
import WhyWantWork from "./WhyWantWork";
import CareCategory from "./CareCategory";
import ChildCareDetails from "./ChildCareDetails";
import ElderlyCareDetails from "./ElderlyCareDetails";
import TutoringDetails from "./TutoringDetails";
import HouseKeepingDetails from "./HouseKeepingDetails";
import EmailPassword from "./EmailPassword";
import SidebarSignup from "./SidebarSignup";

function Signup() {
  const [currentStep, setCurrentStep] = useState("whyWantWork"); // Steps: whyWantWork, careCategory, details, emailPassword
  const [formData, setFormData] = useState({
    reason: "",
    careCategory: "",
    // Add other form fields as needed
  });
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showLocationPopup, setShowLocationPopup] = useState(false);

  const updateFormData = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case "whyWantWork":
        return 1;
      case "careCategory":
        return 2;
      case "details":
        return 3;
      case "emailPassword":
        return selectedCategory ? 4 : 3;
      default:
        return 1;
    }
  };

  const handleWhyWantWorkNext = (reason) => {
    updateFormData("reason", reason);
    setCurrentStep("careCategory");
  };

  const handleCareCategoryNext = () => {
    if (!selectedCategory) return;
    setCurrentStep("details");
  };

  const handleDetailsNext = () => {
    console.debug &&
      console.debug(
        "Signup: handleDetailsNext called - advancing to emailPassword"
      );
    setCurrentStep("emailPassword");
  };

  const handleBack = () => {
    switch (currentStep) {
      case "careCategory":
        setCurrentStep("whyWantWork");
        break;
      case "details":
        setCurrentStep("careCategory");
        break;
      case "emailPassword":
        setCurrentStep("details");
        break;
      default:
        // Go back to login page
        window.history.back();
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case "whyWantWork":
        return (
          <WhyWantWork
            handleNext={handleWhyWantWorkNext}
            handleBack={handleBack}
          />
        );

      case "careCategory":
        return (
          <CareCategory
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            updateFormData={updateFormData}
            handleNext={handleCareCategoryNext}
            handleBack={handleBack}
          />
        );

      case "details":
        // Conditional rendering based on selected category
        switch (selectedCategory) {
          case "Childcare":
            return (
              <ChildCareDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleDetailsNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
              />
            );
          case "Elderly Care":
            return (
              <ElderlyCareDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleDetailsNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
              />
            );
          case "Tutoring":
            return (
              <TutoringDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleDetailsNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
              />
            );
          case "Housekeeping":
            return (
              <HouseKeepingDetails
                formData={formData}
                updateFormData={updateFormData}
                handleNext={handleDetailsNext}
                handleBack={handleBack}
                showLocationPopup={showLocationPopup}
                setShowLocationPopup={setShowLocationPopup}
              />
            );
          default:
            return <div>Please select a category</div>;
        }

      case "emailPassword":
        return (
          <EmailPassword
            formData={formData}
            updateFormData={updateFormData}
            handleBack={handleBack}
          />
        );

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sfpro">
      {/* Sidebar */}
      <SidebarSignup
        activeStep={getCurrentStepNumber()}
        selectedCategory={selectedCategory}
      />

      {/* Main content */}
      <div className="flex-1 ml-[440px] flex items-center justify-center p-4">
        {renderCurrentStep()}
      </div>
    </div>
  );
}

export default Signup;
