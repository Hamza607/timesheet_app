import { useState } from "react";
import { loginUser } from "../../api/authapi";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const storedUser = localStorage.getItem("user");

  // If user is already logged in, don't show login page
  if (storedUser) {
    return <Navigate to="/timesheets" replace />;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await loginUser(email, password);

      localStorage.setItem("user", JSON.stringify(user));

      // Go back to the protected route user originally wanted,
      // otherwise go to /timesheets
      const redirectTo =
        (location.state as { from?: string })?.from || "/timesheets";

      navigate(redirectTo, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="flex items-center justify-center px-6 py-12">
        <form onSubmit={handleSubmit} className="w-full max-w-[510px]">
          <h1 className="text-[22px] font-bold text-slate-900 mb-6">
            Welcome back
          </h1>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          <div className="mb-5">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Email
            </label>
            <input
              className="w-full h-11 border border-slate-300 rounded-md px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              type="email"
              value={email}
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Password
            </label>
            <input
              className="w-full h-11 border border-slate-300 rounded-md px-4 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
              type="password"
              value={password}
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-slate-500 mb-5">
            <input
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-600"
            />
            Remember me
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-blue-600 px-12">
        <div className="max-w-[540px] text-white">
          <h2 className="text-4xl font-bold mb-6">ticktock</h2>

          <p className="text-base leading-7 text-blue-50">
            Introducing ticktock, our cutting-edge timesheet web application
            designed to revolutionize how you manage employee work hours. With
            ticktock, you can effortlessly track and monitor employee attendance
            and productivity from anywhere, anytime, using any
            internet-connected device.
          </p>
        </div>
      </div>
    </div>
  );
}