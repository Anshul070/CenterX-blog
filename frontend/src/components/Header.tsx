import React from "react";
import { Avatar } from "./BlogDisplayCard";
import { useNavigate } from "react-router";
import Menubar from "./Menubar";
import { logout } from "../utils/handlers";

function Header() {
  const navigate = useNavigate();
  const menu = [{
    title : "Profile",
    action : () => {; navigate("/profile/");}
  }, {
    title : "Create Blog",
    action : () => {navigate("/blogs/new/");}
  }, {
    title : "Logout",
    action : () => {navigate("/"); logout()}
  }];
  return (
    <header className="w-full border-b-[1px] border-gray-300 bg-white flex items-center justify-between px-20 py-4">
      <h1 className="cursor-pointer font-bold" onClick={()=>{navigate("/blogs/")}}>CenterX</h1>
      <div className="relative group">
        <Avatar name="Anshul" size={6} />
        <Menubar menu={menu} />
      </div>
    </header>
  );
}

export default Header;
