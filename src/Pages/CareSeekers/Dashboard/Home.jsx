import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaFolderOpen } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { HiOutlineUserPlus } from "react-icons/hi2";
import { BsThreeDots } from "react-icons/bs";
import Sidebar from "./Sidebar";

function Home() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar active="Home" />
      <div className="flex-1 bg-[#f5f8fb] px-6 py-5 font-sfpro ml-64">
      {/* Ensure sidebar highlights Home when this component is used inside dashboard layout */}
      {/* Header */}
      <h1 className="text-[#0a0a0a] text-[17px] font-semibold mb-4">Homepage</h1>

      {/* Greeting */}
      <div className="flex items-center space-x-2 mb-4">
        <FaCheckCircle className="text-[#00b894] text-sm" />
        <p className="text-[#00b894] text-[15px]">
          Hello, <span className="font-semibold">Mark!</span>
        </p>
      </div>

      {/* Care Provider Request & Spending Card */}
      <div className="bg-[#dff0f9] bg-opacity-40 rounded-xl p-5 relative overflow-hidden">
        <div className="flex justify-between items-center">
          <div className="text-[#0093d1]">
            <div className="text-[32px] font-semibold leading-none">7</div>
            <p className="text-[13px] mt-1">New Care Providers request</p>
          </div>
          <div className="text-right">
            <div className="text-[#0093d1] text-[26px] font-semibold leading-none">
              ₦0.00
            </div>
            <p className="text-[13px] mt-1 text-[#333] opacity-60">
              Total Amount Spent
            </p>
          </div>
        </div>
        <button className="w-full mt-4 bg-[#0093d1] text-white rounded-md py-[9px] text-[15px] font-medium">
          View Details
        </button>
      </div>

      {/* Verify Identity */}
      <div className="bg-white rounded-xl p-4 mt-5 flex items-center justify-between border border-gray-100 shadow-sm">
        <div className="flex items-center space-x-3">
          <FaFolderOpen className="text-[#0093d1] text-3xl" />
          <div>
            <h3 className="text-[15px] font-medium text-gray-800">
              Verify Your Identity
            </h3>
            <p className="text-[13px] text-gray-500">
              Upload a verifiable government ID
            </p>
          </div>
        </div>
        <button className="bg-[#0093d1] text-white text-[14px] font-medium px-6 py-2 rounded-md">
          Verify ID
        </button>
      </div>

      {/* What would you like to do */}
      <h2 className="mt-8 mb-3 text-[15px] font-medium text-gray-800">
        What would you like to do today
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-4 flex items-start space-x-3 shadow-sm border border-gray-100">
          <div className="bg-[#ecf7fe] p-2 rounded-md">
            <HiOutlineUserGroup className="text-[#0093d1] text-2xl" />
          </div>
          <div>
            <h4 className="text-[15px] font-medium text-gray-800 mb-[2px]">
              Book a Service
            </h4>
            <p className="text-[13px] text-gray-500 leading-snug">
              Find Your Perfect Care provider
            </p>
          </div>
        </div>
        <div className="bg-[#f2faf8] rounded-xl p-4 flex items-start space-x-3 shadow-sm border border-gray-100">
          <div className="bg-white p-2 rounded-md">
            <HiOutlineUserPlus className="text-[#0093d1] text-2xl" />
          </div>
          <div>
            <h4 className="text-[15px] font-medium text-gray-800 mb-[2px]">
              Become a Care provider
            </h4>
            <p className="text-[13px] text-gray-500 leading-snug">
              Apply to Care for Families
            </p>
          </div>
        </div>
      </div>

      {/* Appointment */}
      <h2 className="mt-8 mb-3 text-[15px] font-medium text-gray-800">
        What would you like to do today
      </h2>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="flex border-b border-gray-100">
          <div className="w-16 flex flex-col items-center justify-center py-4 border-r border-gray-100">
            <p className="text-[13px] text-gray-500">Wed</p>
            <h3 className="text-[17px] font-bold text-[#0093d1]">12</h3>
          </div>
          <div className="flex-1 px-4 py-4">
            <div className="flex items-center justify-between mb-1">
              <p className="text-[14px] text-gray-700 font-medium">
                Child care with Aleem Sarah
              </p>
              <BsThreeDots className="text-gray-400" />
            </div>
            <p className="text-[13px] text-gray-500">
              06:45 AM - 13:00 PM
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Home;
