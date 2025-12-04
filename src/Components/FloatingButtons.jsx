import { MessageCircle } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-4 flex flex-col gap-3 z-50">

      {/* Telegram Button */}
      <div
        onClick={() => window.open("https://t.me/fastastra", "_blank")}
        className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-purple-700 transition relative"
      >
        <MessageCircle className="text-white" size={22} />

        {/* Notification Dot (Optional) */}
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
      </div>

    </div>
  );
};

export default FloatingButtons;
