"use client";

import React from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function SettingPage() {
  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Settings</h1>
          <p className="text-gray-600">Manage your application preferences and configurations.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">General Settings</h2>
          <p className="text-gray-600">Settings page content coming soon...</p>
        </div>
      </div>
    </MainLayout>
  );
}
