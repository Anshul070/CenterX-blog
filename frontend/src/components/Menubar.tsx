import React from "react";

type MenuItem = {
  title: string;
  action: () => void;
};

function Menubar({ menu }: { menu: MenuItem[] }) {
  return (
    <div onClick={(e)=>{e.stopPropagation()}}className="absolute z-100 bg-gray-300 rounded-md mt-2 hidden group-hover:block -translate-x-[50%] left-[50%] text-xs">
      <div className="w-10 h-10 bg-gray-300 rotate-45 absolute -translate-x-[50%] left-[50%] -top-0.5 -z-1" />
      <div className="rounded-md overflow-hidden">
        {menu.map((item, index) => (
          <button
            onClick={item.action}
            key={index}
            className="px-4 py-2 w-full border-b-[0.5px] border-gray-400 hover:bg-gray-400 hover:text-white"
          >
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menubar;
