import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";

import { checkAuth } from "./store/authSlice";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((s) => s.auth.user);

  
  useEffect(() => {
    dispatch(checkAuth());
  }, []);


  const ClientRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "client") return <Navigate to="/" />;
    return children;
  };


  const FreelancerRoute = ({ children }) => {
    if (!user) return <Navigate to="/login" />;
    if (user.role !== "freelancer") return <Navigate to="/" />;
    return children;
  };

  const GuestRoute = ({ children }) => {
    if (user) {
      // Redirect based on role
      return user.role === "client" ? (
        <Navigate to="/create-gig" />
      ) : (
        <Navigate to="/" />
      );
    }
    return children;
  };

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-6">
        <Routes>
          {/* HOME PAGE */}
          <Route path="/" element={<Home />} />

          {/* LOGIN / REGISTER BLOCKED IF LOGGED IN */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />

          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* CLIENT ONLY ROUTE */}
          <Route
            path="/create-gig"
            element={
              <ClientRoute>
                <CreateGig />
              </ClientRoute>
            }
          />

          {/* FREELANCER + CLIENT CAN ACCESS GIG DETAILS */}
          <Route path="/gig/:id" element={<GigDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
