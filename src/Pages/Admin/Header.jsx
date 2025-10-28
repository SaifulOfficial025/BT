import React from "react";

function Header({ title = "Admin" }) {
  const today = new Date();
  const formatted = today.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm font-sfpro">
      <h1 className="text-lg  text-black">{title}</h1>
      <div className="flex items-center space-x-2 text-[11px] text-gray-600 bg-white border border-gray-200 rounded-md px-3 py-2">
        <span>{formatted}</span>
        <span role="img" aria-label="calendar">
          📅
        </span>
      </div>
    </header>
  );
}

export default Header;
