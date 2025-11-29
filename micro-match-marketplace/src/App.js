// src/App.js
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { useAuth } from './context/AuthContext';
// import RoleSwitcher from './components/RoleSwitcher';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import LandingPage from './pages/LandingPage';
import BrowsingPage from './pages/BrowsingPage';
// import ProjectsPage from './pages/ProjectsPage';
import CreateProject from "./pages/CreateProject"; 
import PlaceBid from './pages/PlaceBid';
import DashboardPage from './pages/DashboardPage'; // <- new styled dashboard
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectListPage from './pages/ProjectListPage';
import NotificationPage from './pages/NotificationPage';
import OnboardingPage from './pages/Onboarding';
import MessagePage from './pages/MessagePage';
import AssignmentPage from './pages/AssignmentPage';
import MilestoneDetailPage from './pages/MilestoneDetailPage';
import FinalizeProjectPage from './pages/FinalizeProjectPage';
import ErrorPage from './pages/ErrorPage';
import ProfilePage from './pages/ProfilePage';
import ContributorAssignmentsPage from "./pages/ContributorAssignmentPage";
import MilestoneSubmitPage from "./pages/MilestoneSubmissionPage";



function ProtectedRoute({ children }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/projects" element={<BrowsingPage />} />
        {/* <Route path="/projects" element={<ProjectsPage />} /> */}
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/place-bid" element={<PlaceBid />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/bids" element={<ProjectListPage />} />
        <Route path="/project-details/:projectId" element={<ProjectDetailPage />} />
        <Route path="/my-bids" element={<ProjectListPage />} />
        <Route path="/notifications" element={<NotificationPage />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/messages" element={<MessagePage />} />
        <Route path="/assignment" element={<AssignmentPage />} />
        <Route path="/milestone/:projectId/:milestoneId" element={<MilestoneDetailPage />} />
        <Route path="/finalize/:projectId" element={<FinalizeProjectPage />} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/contributor-assignments" element={<ContributorAssignmentsPage />} />
        <Route path="/milestone-submit/:projectId/:milestoneId" element={<MilestoneSubmitPage />} />

        {/* // catch-all for unknown routes */}
        <Route path="*" element={<ErrorPage />} />  

        {/* Protected Dashboard */}
        <Route
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
