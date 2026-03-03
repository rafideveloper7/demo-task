import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './ProtectedRoutes/ProtectedRoutes';

import LoginPage from './Pages/LoginPage.jsx';
import DriversPage from './Pages/DriversPage';
import ClientsPage from './Pages/ClientsPage';
import StatsPage from './features/stats/StatsPage';
import Dashboard from './layouts/Dashboard';

function AppRoutes() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />} />
      
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard>
              <StatsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/drivers"
        element={
          <ProtectedRoute>
            <Dashboard>
              <DriversPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />

      <Route
        path="/clients"
        element={
          <ProtectedRoute>
            <Dashboard>
              <ClientsPage />
            </Dashboard>
          </ProtectedRoute>
        }
      />

      {/* Redirect any unknown routes to dashboard */}
      <Route path="/" element={<Navigate to="/dashboard" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}