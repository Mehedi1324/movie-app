import React, { useEffect, useState } from 'react';

const SwitchTab = ({ data, onTabChange }) => {
  const [active, setActive] = useState(data[0]);
  console.log(data);
  const handleClickBtn = (tab, index) => {
    onTabChange(tab);
    if (tab === data[0]) {
      setActive(data[0]);
    } else {
      setActive(data[1]);
    }
  };

  return (
    <div>
      <div className="p-[1px] font-bold text-gray-900 bg-white rounded-full">
        {data.map((tab, index) => (
          <span key={index}>
            <button
              onClick={() => handleClickBtn(tab, index)}
              className={` md:w-[100px] md:h-[30px] w-[80px] h-[25px] text-[14px] md:text-[16px]  rounded-full
               ${
                 tab == active &&
                 'bg-gradient-to-r from-green-700 to-orange-700 font-bold text-white'
               }`}
            >
              {tab}
            </button>
          </span>
        ))}
      </div>
    </div>
  );
};

export default SwitchTab;
