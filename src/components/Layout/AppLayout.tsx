import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  let user = null;

  try {
    const storedUser = localStorage.getItem("user");
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-8">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold text-gray-900">ticktock</h1>
          <span className="text-sm text-gray-700">Timesheets</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-sm text-gray-600">
            {user?.name || "John Doe"} ⌄
          </div>

          <button
            onClick={handleLogout}
            className="text-sm text-red-600 hover:text-red-800 font-medium"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="sm:p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
