import React from "react";
import { useNavigate } from "react-router";
import { getFormattedDate } from "../utils/date";

interface BlogCardProps {
  id : string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  published?: boolean;
}

function BlogCard(info: BlogCardProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full h-50 flex flex-col gap-4 cursor-pointer" onClick={()=>{
      navigate(`/blogs/${info.id}`);
    }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center  gap-6 text-sm">
        <Avatar name={info.authorName}/>
        {info.authorName} {Circle()}{" "}
        <span className="opacity-50">{getFormattedDate(info.createdAt)}</span>
      </div>
        <div className="flex items-center gap-2 mt-2">
          {info.published !== undefined ? (info.published ? (
            <span className="text-sm text-blue-400">Published</span>
          ) : (
            <span className="text-sm text-gray-400">Draft</span>
          )) : null}
        </div>
      </div>
      <h1 className="text-3xl font-bold text-black">{info.title}</h1>
      <p className="text-sm text-justify text-gray-500">
        {info.content.slice(0, 250)}...
      </p>
      <hr className="opacity-60 border-gray-400" />
    </div>
  );
}

export function Circle() {
  return <div className="w-1 h-1 bg-zinc-800 rounded-full"></div>;
}

export function Avatar({ name, size = 4 }: { name: string; size?: number }) {
  return (
    <h3
      className={`bg-indigo-600 rounded-full text-white flex items-center justify-center`}
      style={{
        width : `${size*5}px`,
        height: `${size*5}px`,
      }}
    >
      {name.charAt(0)}
    </h3>
  );
}

export default BlogCard;
