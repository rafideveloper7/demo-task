import React from 'react';

import GroupImg from '../assets/images/Group.png';
import Group1Img from '../assets/images/Group1.png';  // Assuming different images
import imageImg from '../assets/images/image.png';
import phoneImg from '../assets/images/phone.png';

const StatsCards = ({ stats }) => {
  // Map each card to its icon
  const cards = [
    { label: 'Total Call', value: stats.totalCall, icon: phoneImg },
    { label: 'Total Rems', value: stats.totalRems, icon: GroupImg },
    { label: 'Total RPM', value: stats.totalRPM, icon: Group1Img },
    { label: 'Total PRI', value: stats.totalPRI, icon: imageImg },
  ];

  return (
    <div className="grid grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm flex items-center gap-4"
        >
          {/* Icon */}
          <img src={card.icon} alt={`${card.label} icon`} className="w-8 h-8" />

          {/* Text Content */}
          <div>
            <p className="text-sm text-gray-500 mb-2">{card.label}</p>
            <p className="text-3xl font-bold text-gray-900">{card.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;