const SectionBox = ({ title }) => {
  return (
    <div className="bg-[#2A2A2A] p-4 rounded-lg text-white w-full">
      <h2 className="font-semibold mb-2">{title}</h2>
      <p className="text-gray-400 text-sm">No data available</p>
    </div>
  );
};

export default SectionBox;
