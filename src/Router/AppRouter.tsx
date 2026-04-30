import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import Login from "../components/Login/Login";
import TimesheetDetailsPage from "../pages/TimesheetsDetailPage";
import TimesheetsPage from "../pages/TimesheetsPage";
import AppLayout from "../components/Layout/AppLayout";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route
            path="/timesheets"
            element={
              <ProtectedRoute>
                <TimesheetsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/timesheets/:timesheetId"
            element={
              <ProtectedRoute>
                <TimesheetDetailsPage />
              </ProtectedRoute>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/timesheets" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
