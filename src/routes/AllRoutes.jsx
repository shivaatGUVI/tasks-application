import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Dashboard from "../pages/Dashboard";
import Add from "../pages/Add";
import Completed from "../pages/Completed";
import PrivateRoute from "./PrivateRoute";

export default function AllRoutes() {
  return (
    <Routes>
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      <Route
        path="/add"
        element={
          <PrivateRoute>
            <Add />
          </PrivateRoute>
        }
      />
      <Route
        path="/complete"
        element={
          <PrivateRoute>
            <Completed />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
