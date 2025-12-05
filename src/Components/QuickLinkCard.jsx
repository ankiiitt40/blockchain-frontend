const QuickLinkCard = ({ label, icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-800">
        {icon}
      </div>
      <p className="text-sm mt-1">{label}</p>
    </div>
  );
};

export default QuickLinkCard;
