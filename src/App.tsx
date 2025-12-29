import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { OfflineProvider } from "@/contexts/OfflineContext";
import { AppShell } from "@/components/layout/AppShell";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/auth/LoginPage";

// Worker Pages
import WorkerHome from "./pages/worker/WorkerHome";
import WorkerQRScan from "./pages/worker/WorkerQRScan";
import WorkerZoneScan from "./pages/worker/WorkerZoneScan";
import WorkerReportCreate from "./pages/worker/WorkerReportCreate";
import WorkerHistory from "./pages/worker/WorkerHistory";

// Foreman Pages
import ForemanDashboard from "./pages/foreman/ForemanDashboard";
import ForemanArrivalScan from "./pages/foreman/ForemanArrivalScan";
import ForemanDepartureScan from "./pages/foreman/ForemanDepartureScan";
import ForemanMoveOpen from "./pages/foreman/ForemanMoveOpen";
import ForemanMoveClose from "./pages/foreman/ForemanMoveClose";
import ForemanReports from "./pages/foreman/ForemanReports";
import ForemanAnomalies from "./pages/foreman/ForemanAnomalies";
import ForemanJournal from "./pages/foreman/ForemanJournal";

// Timekeeper Pages
import TimekeeperAssignments from "./pages/timekeeper/TimekeeperAssignments";
import TimekeeperDispatch from "./pages/timekeeper/TimekeeperDispatch";
import TimekeeperSummary from "./pages/timekeeper/TimekeeperSummary";

// Director Pages
import DirectorDashboard from "./pages/director/DirectorDashboard";
import DirectorObjects from "./pages/director/DirectorObjects";
import DirectorEmployees from "./pages/director/DirectorEmployees";
import DirectorReports from "./pages/director/DirectorReports";

// Admin Pages
import AdminDictionaries from "./pages/admin/AdminDictionaries";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminPolicies from "./pages/admin/AdminPolicies";

import type { UserRole } from "./types";

const queryClient = new QueryClient();

// Protected Route component with role check
function ProtectedRoute({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode; 
  allowedRoles: UserRole[];
}) {
  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Загрузка...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user && !allowedRoles.includes(user.role)) {
    // Redirect to role-appropriate home
    const roleRoutes: Record<UserRole, string> = {
      worker: '/worker/home',
      foreman: '/foreman/dashboard',
      timekeeper: '/timekeeper/assignments',
      director: '/director/dashboard',
      admin: '/admin/dictionaries',
    };
    return <Navigate to={roleRoutes[user.role]} replace />;
  }

  return <AppShell>{children}</AppShell>;
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Worker routes */}
      <Route path="/worker/home" element={
        <ProtectedRoute allowedRoles={['worker']}><WorkerHome /></ProtectedRoute>
      } />
      <Route path="/worker/qr" element={
        <ProtectedRoute allowedRoles={['worker']}><WorkerQRScan /></ProtectedRoute>
      } />
      <Route path="/worker/zone-scan" element={
        <ProtectedRoute allowedRoles={['worker']}><WorkerZoneScan /></ProtectedRoute>
      } />
      <Route path="/worker/report-create" element={
        <ProtectedRoute allowedRoles={['worker']}><WorkerReportCreate /></ProtectedRoute>
      } />
      <Route path="/worker/history" element={
        <ProtectedRoute allowedRoles={['worker']}><WorkerHistory /></ProtectedRoute>
      } />

      {/* Foreman routes */}
      <Route path="/foreman/dashboard" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanDashboard /></ProtectedRoute>
      } />
      <Route path="/foreman/arrival-scan" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanArrivalScan /></ProtectedRoute>
      } />
      <Route path="/foreman/departure-scan" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanDepartureScan /></ProtectedRoute>
      } />
      <Route path="/foreman/move-open" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanMoveOpen /></ProtectedRoute>
      } />
      <Route path="/foreman/move-close" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanMoveClose /></ProtectedRoute>
      } />
      <Route path="/foreman/reports" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanReports /></ProtectedRoute>
      } />
      <Route path="/foreman/anomalies" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanAnomalies /></ProtectedRoute>
      } />
      <Route path="/foreman/journal" element={
        <ProtectedRoute allowedRoles={['foreman']}><ForemanJournal /></ProtectedRoute>
      } />

      {/* Timekeeper routes */}
      <Route path="/timekeeper/assignments" element={
        <ProtectedRoute allowedRoles={['timekeeper']}><TimekeeperAssignments /></ProtectedRoute>
      } />
      <Route path="/timekeeper/dispatch" element={
        <ProtectedRoute allowedRoles={['timekeeper']}><TimekeeperDispatch /></ProtectedRoute>
      } />
      <Route path="/timekeeper/summary" element={
        <ProtectedRoute allowedRoles={['timekeeper']}><TimekeeperSummary /></ProtectedRoute>
      } />

      {/* Director routes */}
      <Route path="/director/dashboard" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorDashboard /></ProtectedRoute>
      } />
      <Route path="/director/objects" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorObjects /></ProtectedRoute>
      } />
      <Route path="/director/object/:id" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorObjects /></ProtectedRoute>
      } />
      <Route path="/director/employees" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorEmployees /></ProtectedRoute>
      } />
      <Route path="/director/employee/:id" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorEmployees /></ProtectedRoute>
      } />
      <Route path="/director/reports" element={
        <ProtectedRoute allowedRoles={['director']}><DirectorReports /></ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/dictionaries" element={
        <ProtectedRoute allowedRoles={['admin']}><AdminDictionaries /></ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>
      } />
      <Route path="/admin/policies" element={
        <ProtectedRoute allowedRoles={['admin']}><AdminPolicies /></ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <OfflineProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </OfflineProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
