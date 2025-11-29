import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FloatingProfileButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/profile")}
      className="
        fixed bottom-6 left-6
        w-14 h-14 z-50
        flex items-center justify-center
        rounded-full shadow-lg
        bg-white text-blue-600
        border border-gray-200
        hover:bg-blue-50 hover:shadow-xl
        transition
      "
    >
      <User className="w-6 h-6" />
    </button>
  );
}
