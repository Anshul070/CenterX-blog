type MenuItem = {
  title: string;
  action: () => void;
  style: string;
  loading?: boolean 
};

function Menubar({ menu }: { menu: MenuItem[] }) {
  return (
    <div onClick={(e)=>{e.stopPropagation()}}className="bg-white border-gray-300 border absolute z-100 rounded-md mt-2 hidden group-hover:block group-0. -translate-x-[50%] -left-5 md:left-[50%] text-xs">
      <div className="w-10 h-10 absolute -translate-x-[50%] left-15 md:left-[50%] -top-3 -z-1" />
      <div className="rounded-md overflow-hidden z-10 relative">
        {menu.map((item, index) => (
          <button
            onClick={item.action}
            key={index}
            className={`block w-full text-left px-4 py-2 text-sm ${item.style} hover:bg-gray-100`}
          >
            {item.loading ? "Loading" : item.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Menubar;
