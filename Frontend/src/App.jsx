import { Toaster } from "react-hot-toast";
import LoginPage from "./Screens/LoginPage";
import RegisterPage from "./Screens/RegisterPage";
import VerifyEmail from "./Screens/VerifyEmail";
import Dashboard from "./Screens/Dashboard";
import LoadingSpinner from "./Components/LoadingSpinner"
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./Store/authStore";
import { useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};

const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (isAuthenticated && user.isVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  
  if (isCheckingAuth) return <LoadingSpinner />;
  console.log("isAuthenticated", isAuthenticated);
  console.log("user", user);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUser>
                <LoginPage />
              </RedirectAuthenticatedUser>
            }
            exact
          />
          <Route
            path="/register"
            element={
              <RedirectAuthenticatedUser>
                <RegisterPage />
              </RedirectAuthenticatedUser>
            }
            exact
          />
          <Route path="/verify-email" element={<VerifyEmail />} exact />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
