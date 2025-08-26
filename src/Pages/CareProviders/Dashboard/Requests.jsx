import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useNavigate, useLocation } from "react-router-dom";

const tabs = ["Active", "Closed", "Pending"];

const activeRequests = [
  {
    day: "Wed",
    date: "12",
    title: "Child care with Aleem Sarah",
    time: "06:45 AM - 13:00 PM",
    avatar: "https://ui-avatars.com/api/?name=Aleem+Sarah&background=E5E7EB&color=374151&size=64"
  }
];

const closedRequests = [
  {
    name: "Aleem Sarah",
    dateRange: "Jan 20, 2025 - Mar 6, 2025",
    rating: 5,
    review: `The family was very organized with clear instructions for medications and routines, which made my job much easier. They were always respectful of my time and paid promptly. The only minor issue was that sometimes the adult children would change care schedules last minute, which made it a bit challenging to plan my week. I genuinely looked forward to each visit and felt like I was making a real difference in their daily lives. I would definitely recommend this family to other caregivers - they truly appreciate the work we do.`,
    avatar: "https://ui-avatars.com/api/?name=Aleem+Sarah&background=E5E7EB&color=374151&size=64"
  },
  // Repeat for demo
  {
    name: "Aleem Sarah",
    dateRange: "Jan 20, 2025 - Mar 6, 2025",
    rating: 5,
    review: `The family was very organized with clear instructions for medications and routines, which made my job much easier. They were always respectful of my time and paid promptly. The only minor issue was that sometimes the adult children would change care schedules last minute, which made it a bit challenging to plan my week. I genuinely looked forward to each visit and felt like I was making a real difference in their daily lives. I would definitely recommend this family to other caregivers - they truly appreciate the work we do.`,
    avatar: "https://ui-avatars.com/api/?name=Aleem+Sarah&background=E5E7EB&color=374151&size=64"
  },
  {
    name: "Aleem Sarah",
    dateRange: "Jan 20, 2025 - Mar 6, 2025",
    rating: 5,
    review: `The family was very organized with clear instructions for medications and routines, which made my job much easier. They were always respectful of my time and paid promptly. The only minor issue was that sometimes the adult children would change care schedules last minute, which made it a bit challenging to plan my week. I genuinely looked forward to each visit and felt like I was making a real difference in their daily lives. I would definitely recommend this family to other caregivers - they truly appreciate the work we do.`,
    avatar: "https://ui-avatars.com/api/?name=Aleem+Sarah&background=E5E7EB&color=374151&size=64"
  }
];

const pendingRequests = [
  {
    posted: "Posted 5 minutes ago",
    title: "Professional nanny to care for two kids over 10 days consecutively",
    desc: "Professional nanny needed in Lagos to care for two kids over 10 consecutive days. Looking for trustworthy individual with childcare background, clean record, and own transportation. Must be patient, creative, and capable of handling emergencies responsibly"
  },
  {
    posted: "Posted 5 minutes ago",
    title: "Professional nanny to care for two kids over 10 days consecutively",
    desc: "Professional nanny needed in Lagos to care for two kids over 10 consecutive days. Looking for trustworthy individual with childcare background, clean record, and own transportation. Must be patient, creative, and capable of handling emergencies responsibly"
  }
];

function Requests() {
  const location = useLocation();
  const initialTab = location.state && typeof location.state.tab === "number" ? location.state.tab : 0;
  const [selectedTab, setSelectedTab] = useState(initialTab);
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar active="Requests" />
      <div className="flex-1 font-sfpro px-8 py-8 ml-64 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center mb-8">
          <button className="mr-4 text-gray-500 hover:text-[#0d99c9] text-xl">&#8592;</button>
          <h1 className="text-2xl font-semibold text-gray-800">Request</h1>
        </div>
        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          {tabs.map((tab, idx) => {
            let count = 0;
            if (tab === "Active") count = activeRequests.length;
            else if (tab === "Closed") count = closedRequests.length;
            else if (tab === "Pending") count = pendingRequests.length;
            return (
              <button
                key={tab}
                className={`py-2 px-4 text-gray-500 font-medium focus:outline-none relative ${selectedTab === idx ? "text-[#0d99c9]" : ""}`}
                onClick={() => setSelectedTab(idx)}
              >
                {tab} <span className="ml-1 text-gray-400">({count})</span> {selectedTab === idx && (
                  <span className="absolute left-0 right-0 -bottom-1 h-0.5 bg-[#0d99c9] rounded-full"></span>
                )}
              </button>
            );
          })}
        </div>
        {/* Tab Content */}
        <div className="pt-6">
          {selectedTab === 0 && (
            <div>
              {activeRequests.map((req, i) => (
                <div key={i} className="flex items-center bg-gray-50 rounded-lg shadow-sm p-4 mb-4">
                  <div className="flex flex-col items-center mr-4">
                    <span className="text-gray-400 text-sm">{req.day}</span>
                    <span className="text-[#0d99c9] font-bold text-lg">{req.date}</span>
                  </div>
                  <div className="py-8 px-0.5 mr-2 bg-[#0d99c9] rounded-l-lg"></div>
                  <img src={req.avatar} alt="avatar" className="w-10 h-10 rounded-full mr-4" />
                  <div>
                    <div className="font-medium text-gray-800">{req.title}</div>
                    <div className="text-xs text-gray-400 mt-1">{req.time}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {selectedTab === 1 && (
            <div>
              {closedRequests.map((req, i) => (
                <button
                  key={i}
                  className="w-full text-left bg-gray-50 rounded-lg shadow-sm p-6 mb-4 flex hover:bg-gray-100 transition"
                  onClick={() => navigate("/careproviders/dashboard/request_details")}
                >
                  <img src={req.avatar} alt="avatar" className="w-12 h-12 rounded-full mr-4" />
                  <div>
                    <div className="font-semibold text-gray-800">{req.name}</div>
                    <div className="text-xs text-gray-400 mb-1">{req.dateRange}</div>
                    <div className="flex items-center mb-2">
                      <span className="text-xs text-gray-500">{req.rating}.0</span>
                      <span className="text-[#cb9e49] mr-1">{"★".repeat(req.rating)}</span>
                    </div>
                    <div className="text-sm text-gray-600 leading-relaxed">{req.review}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
          {selectedTab === 2 && (
            <div>
              {pendingRequests.map((req, i) => (
                <PendingRequestCard key={i} req={req} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PendingRequestCard({ req }) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const handleMenu = (e) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
  };
  const handleClose = () => {
    setMenuOpen(false);
    // Add close logic here
  };
  const handleEdit = () => {
    setMenuOpen(false);
    // Add edit logic here
  };
  return (
    <div className="bg-gray-50 rounded-lg shadow-sm p-4 mb-4 relative">
      <div className="absolute top-3 right-3">
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 focus:outline-none"
          onClick={handleMenu}
        >
          <svg width="20" height="20" fill="currentColor" className="text-gray-400" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </button>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              onClick={handleClose}
            >
              Close
            </button>
            <button
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
              onClick={handleEdit}
            >
              Edit
            </button>
          </div>
        )}
      </div>
      <div className="text-xs text-gray-400 mb-1">{req.posted} </div>
      <div className="font-medium text-gray-800 mb-1">{req.title}</div>
      <div className="text-sm text-gray-600">{req.desc}</div>
    </div>
  );
}

export default Requests;
