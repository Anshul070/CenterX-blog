import React from "react";
import { Avatar } from "./BlogCard";
import { useNavigate } from "react-router";

function Header() {
  const navigate = useNavigate();
  const menu = [{
    title : "Profile",
    action : () => {navigate("/profile/");}
  }, {
    title : "Create Blog",
    action : () => {navigate("/blogs/create");}
  }, {
    title : "Logout",
    action : () => {navigate("/signin");}
  }];
  return (
    <header className="w-full border-b-[1px] border-gray-300 bg-white flex items-center justify-between px-20 py-4">
      <h1 className="cursor-pointer font-bold" onClick={()=>{navigate("/blogs/")}}>CenterX</h1>
      <div className="relative group">
        <Avatar name="Anshul" size={6} />
        <div className="absolute bg-gray-300 rounded-md mt-2 hidden group-hover:block -translate-x-[50%] left-[50%] text-xs">
          <div className="w-10 h-10 bg-gray-300 rotate-45 absolute -translate-x-[50%] left-[50%] -top-0.5 -z-1"/>
          <div className="rounded-md overflow-hidden">
            {
            menu.map((item, index) => (
              <button
              onClick={item.action}
                key={index}
                className="px-4 py-2 w-full border-b-[0.5px] border-gray-400 hover:bg-gray-400 hover:text-white"
              >
                {item.title}
              </button>
            ))
          }
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
