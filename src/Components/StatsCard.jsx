const StatsCard = ({ icon, title, value }) => {
  return (
    <div className="bg-[#2A2A2A] rounded-lg p-4 text-white flex flex-col gap-1 w-full">
      <div className="flex items-center gap-2 text-gray-300">
        {icon}
        <span>{title}</span>
      </div>
      <span className="text-xl font-semibold">{value}</span>
    </div>
  );
};

export default StatsCard;
