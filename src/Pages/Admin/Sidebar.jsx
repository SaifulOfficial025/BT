import React from 'react';
import { NavLink } from 'react-router-dom';
import Carelogo from "../../../public/careLogo.png";


import UsersIcon from '../../../public/people.svg?react';
import ActivitiesIcon from '../../../public/3dcube.svg?react';
import EarningsIcon from '../../../public/wallet-check.svg?react';
import SubscriptionIcon from '../../../public/cards.svg?react';
import SupportIcon from '../../../public/message-question.svg?react';
import ProfileIcon from '../../../public/profile-tick.svg?react';
import MessageNotifyIcon from '../../../public/message-notif.svg?react';

const navItems = [
  { to: '/admin/users', label: 'Users', icon: <UsersIcon className="w-5 h-5" /> },
  { to: '/admin/activities', label: 'Activities', icon: <ActivitiesIcon className="w-5 h-5" /> },
  { to: '/admin/earnings', label: 'Earnings', icon: <EarningsIcon className="w-5 h-5" /> },
  { to: '/admin/subscription', label: 'Subscription', icon: <SubscriptionIcon className="w-5 h-5" /> },
  { to: '/admin/support', label: 'Support', icon: <SupportIcon className="w-5 h-5" /> },
  { to: '/admin/profile-verification', label: 'Profile Verification', icon: <ProfileIcon className="w-5 h-5" /> },
  { to: '/admin/messages', label: 'Notifications & Messages', icon: <MessageNotifyIcon className="w-5 h-5" /> },
];

function Sidebar() {
  return (
    <aside className="h-screen w-56 bg-[#0e2f43] text-white flex flex-col font-sfpro">
      <div className="px-4 py-6 mb-4 flex items-center space-x-2">
        {/* Placeholder for logo */}
        <img src={Carelogo} alt="CareNestPro Logo" className="w-8 h-8 " />
        <span className="text-lg ">CareNestPro</span>
      </div>
      <nav className="flex-1">
        <ul className="space-y-1">
          {navItems.map(item => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) => `flex items-center px-4 py-3 text-xs rounded-md transition-colors duration-150 hover:bg-[#1d4353] ${isActive ? 'bg-[#567180]' : ''}`}
              >
                <span className="mr-3 text-base ">{item.icon}</span>
                <span className="leading-none tracking-wide text-md">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
