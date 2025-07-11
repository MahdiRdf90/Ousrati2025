
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/LanguageSelector";
import AuthProvider from "./components/Auth/AuthProvider";
import DataProvider from "./data/DataProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import ChatBot from "./components/ChatBot";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import AdminDashboard from "./pages/AdminDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import FormateurDashboard from "./pages/FormateurDashboard";
import Booking from "./pages/Booking";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import Clinics from "./pages/Clinics";
import Users from "./pages/Users";
import Marketing from "./pages/Marketing";
import Tests from "./pages/Tests";
import PreMarriageTests from "./pages/PreMarriageTests";
import Messages from "./pages/Messages";
import Reports from "./pages/Reports";
import Appointments from "./pages/Appointments";
import Clients from "./pages/Clients";
import UserSpace from "./pages/UserSpace";
import SupportGroups from "./pages/SupportGroups";
import Recommendations from "./pages/Recommendations";
import NotFound from "./pages/NotFound";
import ProfileManager from "./components/ProfileManager";
import Resources from "./pages/Resources";
import About from "./pages/About";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <DataProvider>
      <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Protected Admin Routes */}
              <Route 
                path="/admin-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['admin']}>
                    <AdminDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Client Routes */}
              <Route 
                path="/client-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['client']}>
                    <ClientDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Protected Formateur Routes */}
              <Route 
                path="/formateur-dashboard" 
                element={
                  <ProtectedRoute allowedRoles={['formateur']}>
                    <FormateurDashboard />
                  </ProtectedRoute>
                } 
              />
              
              {/* Public Routes */}
              <Route path="/booking" element={<Booking />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/course/:courseId" element={<CourseDetail />} />
              <Route path="/clinics" element={<Clinics />} />
              <Route path="/users" element={<Users />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/tests" element={<Tests />} />
              <Route path="/pre-marriage-tests" element={<PreMarriageTests />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/reports" element={<Reports />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/user-space" element={<UserSpace />} />
            <Route path="/support-groups" element={<SupportGroups />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/create-course" element={<Courses />} />
            <Route path="/detailed-reports" element={<Reports />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/about" element={<About />} />
            
            {/* Profile Management Route */}
            <Route path="/profile" element={<ProfileManager />} />
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ChatBot />
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
      </AuthProvider>
    </DataProvider>
  </QueryClientProvider>
);

export default App;
