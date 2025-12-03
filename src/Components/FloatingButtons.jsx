import { MessageCircle, Phone } from "lucide-react";

const FloatingButtons = () => {
  return (
    <div className="fixed bottom-6 right-4 flex flex-col gap-3">
      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
        <Phone className="text-white" size={20} />
      </div>

      <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg relative">
        <MessageCircle className="text-white" size={20} />
        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
      </div>
    </div>
  );
};

export default FloatingButtons;
