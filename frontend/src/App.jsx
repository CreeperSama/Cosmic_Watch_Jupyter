// import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
// import { AnimatePresence } from 'framer-motion';
// import Navbar from './components/Navbar';
// import Dashboard from './pages/Dashboard';
// import Login from './pages/Login';
// import LandingPage from './pages/LandingPage';

// const AnimatedRoutes = () => {
//   const location = useLocation();
//   const showNavbar = location.pathname !== '/';

//   return (
//     <>
//       {showNavbar && <Navbar />}
//       <AnimatePresence mode="wait">
//         <Routes location={location} key={location.pathname}>
//           <Route path="/" element={<LandingPage />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </AnimatePresence>
//     </>
//   );
// };

// function App() {
//   return (
//     <Router>
//       <AnimatedRoutes />
//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LandingPage from './pages/LandingPage';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-blue-500 font-mono tracking-widest">INITIALIZING SECURE CONNECTION...</div>;
  return user ? children : <Navigate to="/login" />;
};

// Navbar Wrapper (Hidden on Landing and Login)
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="antialiased font-sans bg-black min-h-screen">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;