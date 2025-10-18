"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/assets/icons/logo.svg";
import DashboardIcon from "@/assets/icons/dashboard.svg";
import PaymentIcon from "@/assets/icons/wallet.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import LogoutIcon from "@/assets/icons/log-out.svg";

// Define navigation items
interface NavItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

// Main navigation items (top section)
const mainNavigationItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/payment",
    icon: <DashboardIcon />,
  },
  {
    name: "Payment",
    href: "/payment/list/page",
    icon: <PaymentIcon />,
  },
  
];

// Bottom navigation items (before user profile)
const bottomNavigationItems: NavItem[] = [
  {
    name: "Settings",
    href: "/settings",
    icon: <SettingsIcon />,
  },
];

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className = "" }) => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname === href;
  };

  return (
    <div
      className={`bg-black text-white w-64 min-h-screen flex flex-col ${className}`}
    >
      {/* Logo Section */}
      <div className="py-3 pl-5 border-b border-white">
        <div className="flex items-center">
          <Logo className="w-[80px] h-7 " />
        </div>
      </div>

      {/* Main Navigation Section */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {mainNavigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Navigation Section (Settings) */}
      <div className="px-4 pb-4">
        <ul className="space-y-2">
          {bottomNavigationItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 ${
                  isActive(item.href)
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                <span className="font-medium">{item.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 border-dashed mx-4"></div>
      {/* Divider */}
      <div className="border-t border-gray-700 border-dashed mx-4"></div>

      {/* User Profile Section */}
      <div className="p-4">
        <div className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
          <div className="flex items-center">
            {/* User Avatar */}
            <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-white">RF</span>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Robert Fox</p>
              <p className="text-xs text-gray-400">robertfox@gmail.com</p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={() => {
              // Add logout logic here
              console.log("Logout clicked");
            }}
            className="text-gray-400 hover:text-white transition-colors duration-200"
            title="Logout"
          >
            <LogoutIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
