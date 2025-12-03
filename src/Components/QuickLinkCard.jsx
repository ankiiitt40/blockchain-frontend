const QuickLinkCard = ({ icon, label }) => {
  return (
    <div className="flex flex-col items-center text-white">
      <div className="p-3 rounded-full bg-[#2A2A2A]">{icon}</div>
      <span className="text-sm mt-1">{label}</span>
    </div>
  );
};

export default QuickLinkCard;
