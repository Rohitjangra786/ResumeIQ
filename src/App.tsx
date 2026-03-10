/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/auth/LoginPage';
import { SignupPage } from './pages/auth/SignupPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { OverviewPage } from './pages/dashboard/OverviewPage';
import { ResumeUploadPage } from './pages/dashboard/ResumeUploadPage';
import { SkillGapAnalysisPage } from './pages/dashboard/SkillGapAnalysisPage';
import { CareerRecommendationPage } from './pages/dashboard/CareerRecommendationPage';
import { JobMarketAnalyticsPage } from './pages/dashboard/JobMarketAnalyticsPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="upload" element={<ResumeUploadPage />} />
          <Route path="skills" element={<SkillGapAnalysisPage />} />
          <Route path="career" element={<CareerRecommendationPage />} />
          <Route path="market" element={<JobMarketAnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
