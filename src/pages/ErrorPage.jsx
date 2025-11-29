import { Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-white text-gray-900 flex justify-center">
      <div className="w-full max-w-[1440px] px-20 py-24">
        <div className="w-full max-w-[720px] mx-auto text-center p-16 rounded-3xl border border-gray-100 bg-white shadow-sm">
          <div className="text-7xl mb-5">😵‍💫</div>

          <h1 className="text-[28px] leading-8 font-bold mb-2">Something went wrong</h1>
          <p className="text-[15px] leading-6 text-gray-600 mb-8">
            We couldn’t load this page. It might be moved, deleted, or temporarily unavailable.
          </p>

          <div className="flex gap-4 justify-center">
            {/* Go Home */}
            <button
              onClick={() => navigate("/dashboard")}
              className="bg-blue-600 text-white px-7 py-3.5 rounded-xl text-[14px] font-medium hover:bg-blue-700 transition flex items-center gap-2"
            >
              <Home className="w-4 h-4" /> Go to Home
            </button>

            {/* Try Again */}
            <button
              onClick={() => window.location.reload()}
              className="border border-gray-300 text-gray-800 px-7 py-3.5 rounded-xl text-[14px] font-medium hover:bg-gray-100 transition"
            >
              Try Again
            </button>
          </div>

          <div className="mt-8 text-[12px] leading-5 text-gray-500">
            Error code: <span className="font-mono">404 / 500</span>
          </div>
        </div>
      </div>
    </div>
  );
}