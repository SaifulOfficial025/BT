import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function AlreadyLoggedIn() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Already Logged In
          </h2>
          <p className="text-gray-600 mb-1">
            You are currently logged in as{" "}
            <strong className="text-gray-800">
              {user?.user_type === "provider" ? "Care Provider" : "Care Seeker"}
            </strong>
          </p>
          <p className="text-sm text-gray-500">
            ({user?.email || user?.username || "User"})
          </p>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-700">
            To access this area, please log out first and then sign in with the
            correct account type.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-[#0093d1] text-white py-3 rounded-md font-semibold hover:bg-[#007bb0] transition"
          >
            Logout
          </button>
          <button
            onClick={() => {
              const dashboardPath =
                user?.user_type === "provider"
                  ? "/careproviders/dashboard"
                  : "/careseekers/dashboard";
              navigate(dashboardPath);
            }}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-md font-semibold hover:bg-gray-50 transition"
          >
            Go to My Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
