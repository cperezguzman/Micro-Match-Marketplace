// src/pages/ForgotPasswordPage.jsx
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle sending reset email
    alert("Reset link sent (not really, just demo)");
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-gradient-to-b from-white to-gray-50 text-gray-900 font-sans px-6">
      {/* Card */}
      <div className="bg-white shadow-lg rounded-3xl p-10 max-w-md w-full border border-gray-100">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl font-bold mb-2 text-blue-600">Forgot Password?</h1>
          <p className="text-gray-600 text-center text-sm">
            Don’t worry — it happens to the best of us.
            Enter your email address below and we’ll send you a reset link.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="flex items-center border border-gray-300 rounded-xl px-4 py-3 focus-within:border-blue-500 transition">
            <Mail className="w-5 h-5 text-gray-500 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none text-gray-800 placeholder-gray-400 text-sm"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 pl-5 pr-6 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {/* Back to Login */}
        <div className="flex items-center justify-center mt-6 text-sm">
          <ArrowLeft className="w-4 h-4 mr-1 text-blue-600" />
          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline font-medium"
          >
            Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}
