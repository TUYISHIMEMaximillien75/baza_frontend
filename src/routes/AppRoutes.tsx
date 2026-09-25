import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { PublicLayout } from '../layouts/PublicLayout';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { AdminLayout } from '../layouts/AdminLayout';
import { AuthLayout } from '../layouts/AuthLayout';

import { HomePage } from '../pages/HomePage';
import { MarketplacePage } from '../pages/MarketplacePage';
import { ListingDetailPage } from '../pages/ListingDetailPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AlertsPage } from '../pages/AlertsPage';
import { ProfilePage } from '../pages/ProfilePage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { CreateListingPage } from '../pages/CreateListingPage';
import { MyListingsPage } from '../pages/MyListingsPage';
import { SavedCollectionPage } from '../pages/SavedCollectionPage';
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { ForgotPasswordPage } from '../pages/ForgotPasswordPage';
import { NotFoundPage } from '../pages/NotFoundPage';
import { ForbiddenPage } from '../pages/ForbiddenPage';
import { ServerErrorPage } from '../pages/ServerErrorPage';
import { PlaceholderPage } from '../pages/PlaceholderPage';

import { useSessionStore } from '../store';
import authService from '../services/authService';

// ─── Route Guards ─────────────────────────────────────────────────────────────

/** Redirects to /login if not authenticated. Preserves current path for post-login redirect. */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSessionStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

/** Redirects to /403 if user does not have ADMIN or SUPER_ADMIN role. */
const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, user } = useSessionStore();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdmin = user?.roles?.some((r) => r === 'ADMIN' || r === 'SUPER_ADMIN');
  if (!isAdmin) {
    return <Navigate to="/403" replace />;
  }

  return <>{children}</>;
};

/** Redirects authenticated users away from login/register back to dashboard. */
const GuestRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useSessionStore();
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};

// ─── App Routes ───────────────────────────────────────────────────────────────

export const AppRoutes: React.FC = () => {
  const { isAuthenticated, accessToken, setSession, user, refreshToken } = useSessionStore();

  // On mount, validate token and restore or extend session
  useEffect(() => {
    if (accessToken && !isAuthenticated) {
      authService.getMe().catch(() => {
        // Token is invalid — store will be cleared by 401 interceptor
      });
    }
  }, []);

  return (
    <Routes>
      {/* ── Public Routes ───────────────────────────────────────────────────── */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketplace" element={<MarketplacePage />} />
        <Route path="/listings/:slug" element={<ListingDetailPage />} />
      </Route>

      {/* ── Authenticated Dashboard Routes ──────────────────────────────────── */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/listings/new" element={<CreateListingPage />} />
        <Route path="/my-listings" element={<MyListingsPage />} />
        <Route path="/saved" element={<SavedCollectionPage />} />
        <Route path="/alerts" element={<AlertsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route
          path="/verification"
          element={
            <PlaceholderPage
              title="Verification Centre"
              description="Upload seller or dealer credentials to receive a verified badge."
            />
          }
        />
        <Route
          path="/visit-requests"
          element={
            <PlaceholderPage
              title="Visit Requests"
              description="Schedule site visits and manage buyer appointment requests."
            />
          }
        />
      </Route>

      {/* ── Admin Routes ────────────────────────────────────────────────────── */}
      <Route
        element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }
      >
        <Route path="/admin" element={<AdminDashboardPage />} />
        <Route
          path="/admin/users"
          element={
            <PlaceholderPage
              title="User Management"
              description="Search, inspect, and moderate registered users and roles."
            />
          }
        />
        <Route
          path="/admin/verifications"
          element={
            <PlaceholderPage
              title="Verification Queue"
              description="Review document submissions for Seller, Broker, and Dealer badges."
            />
          }
        />
        <Route
          path="/admin/listings"
          element={
            <PlaceholderPage
              title="Listing Moderation"
              description="Approve, request changes, or reject newly submitted listings."
            />
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PlaceholderPage
              title="Flagged Reports"
              description="Investigate user reports regarding inaccurate prices or suspicious listings."
            />
          }
        />
        <Route
          path="/admin/categories"
          element={
            <PlaceholderPage
              title="Categories & Attributes"
              description="Manage property and vehicle category hierarchies."
            />
          }
        />
        <Route
          path="/admin/locations"
          element={
            <PlaceholderPage
              title="Rwanda Locations"
              description="Manage provinces, districts, and sectors mapping."
            />
          }
        />
      </Route>

      {/* ── Auth Routes (guests only) ────────────────────────────────────────── */}
      <Route element={<AuthLayout />}>
        <Route
          path="/login"
          element={
            <GuestRoute>
              <LoginPage />
            </GuestRoute>
          }
        />
        <Route
          path="/register"
          element={
            <GuestRoute>
              <RegisterPage />
            </GuestRoute>
          }
        />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* ── Error Routes ─────────────────────────────────────────────────────── */}
      <Route path="/403" element={<ForbiddenPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
