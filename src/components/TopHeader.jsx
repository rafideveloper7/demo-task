import React from "react";

const TopHeader = () => {
  return (
    <header
      className="w-full h-[77px] flex items-center justify-between px-8
                 border-b border-[#E6E6E6] bg-white"
    >
      {/* Title */}
      <h1
        className="font-['Roboto'] font-semibold italic
                   text-[24px] leading-[120%]
                   text-[#0078BD]"
      >
        Earnings Dashboard
      </h1>

      {/* Buttons */}
      <div className="flex items-center gap-4">
        <button
          className="flex items-center gap-2 px-4 py-2
                     text-sm font-medium text-[#0078BD]
                     bg-[#EAF4FB] rounded-lg hover:bg-[#d8ebf7] transition"
        >
          <span className="text-lg leading-none">+</span> Add Client
        </button>

        <button
          className="flex items-center gap-2 px-4 py-2
                     text-sm font-medium text-white
                     bg-[#0078BD] rounded-lg hover:bg-[#0066a3] transition"
        >
          <span className="text-lg leading-none">+</span> Add Driver
        </button>
      </div>
    </header>
  );
};

export default TopHeader;