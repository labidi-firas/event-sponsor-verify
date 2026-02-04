import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Pages
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

// Laboratory Pages
import LaboratoryDashboard from "./pages/laboratory/Dashboard";
import Events from "./pages/laboratory/Events";
import Sponsorships from "./pages/laboratory/Sponsorships";
import Declare from "./pages/laboratory/Declare";
import Import from "./pages/laboratory/Import";

// Participant Pages
import ParticipantEvents from "./pages/participant/Events";
import ParticipantRegistrations from "./pages/participant/Registrations";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminEvents from "./pages/admin/Events";
import AdminParticipants from "./pages/admin/Participants";
import AdminConflicts from "./pages/admin/Conflicts";
import Users from "./pages/admin/Users";
import AIConfig from "./pages/admin/AIConfig";

const queryClient = new QueryClient();

function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode; allowedRoles?: string[] }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Redirect to appropriate dashboard based on role
    const roleRoutes: Record<string, string> = {
      laboratory: '/dashboard',
      participant: '/participant/events',
      admin: '/admin/dashboard',
    };
    return <Navigate to={roleRoutes[user.role] || '/dashboard'} replace />;
  }

  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} 
      />

      {/* Root redirect */}
      <Route 
        path="/" 
        element={
          isAuthenticated 
            ? <Navigate to={
                user?.role === 'participant' 
                  ? '/participant/events' 
                  : user?.role === 'admin' 
                    ? '/admin/dashboard' 
                    : '/dashboard'
              } replace />
            : <Navigate to="/login" replace />
        } 
      />

      {/* Laboratory routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute allowedRoles={['laboratory']}>
          <LaboratoryDashboard />
        </ProtectedRoute>
      } />
      <Route path="/events" element={
        <ProtectedRoute allowedRoles={['laboratory']}>
          <Events />
        </ProtectedRoute>
      } />
      <Route path="/sponsorships" element={
        <ProtectedRoute allowedRoles={['laboratory']}>
          <Sponsorships />
        </ProtectedRoute>
      } />
      <Route path="/declare" element={
        <ProtectedRoute allowedRoles={['laboratory']}>
          <Declare />
        </ProtectedRoute>
      } />
      <Route path="/import" element={
        <ProtectedRoute allowedRoles={['laboratory']}>
          <Import />
        </ProtectedRoute>
      } />

      {/* Participant routes */}
      <Route path="/participant/events" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <ParticipantEvents />
        </ProtectedRoute>
      } />
      <Route path="/participant/registrations" element={
        <ProtectedRoute allowedRoles={['participant']}>
          <ParticipantRegistrations />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/events" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminEvents />
        </ProtectedRoute>
      } />
      <Route path="/admin/participants" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminParticipants />
        </ProtectedRoute>
      } />
      <Route path="/admin/conflicts" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AdminConflicts />
        </ProtectedRoute>
      } />
      <Route path="/admin/users" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Users />
        </ProtectedRoute>
      } />
      <Route path="/admin/ai-config" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <AIConfig />
        </ProtectedRoute>
      } />

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
