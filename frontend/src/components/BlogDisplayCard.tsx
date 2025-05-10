import { useNavigate } from "react-router";
import { getFormattedDate } from "../utils/date";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Menubar from "./Menubar";

interface BlogDisplayCardProps {
  id: string;
  title: string;
  content: string;
  authorName: string;
  createdAt: string;
  published?: boolean;
  menu?: {
    title: string;
    action: () => void;
  }[];
}

function BlogDisplayCard(info: BlogDisplayCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col gap-4 pt-6 cursor-pointer"
      onClick={(e) => {e.stopPropagation
        navigate(`/blogs/${info.id}`);
      }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center  gap-6 text-sm">
          <Avatar name={info.authorName} />
          {info.authorName} {Circle()}{" "}
          <span className="opacity-50">{getFormattedDate(info.createdAt)}</span>
        </div>
        <div className="flex items-center gap-2 mt-2 z-100">
          {info.published !== undefined ? (
            info.published ? (
              <div className="flex items-center gap-1">
                <span className="text-xs bg-blue-500 p-1 rounded-lg opacity-50 text-white">
                  Published
                </span>
                <span className="text-lg group relative text-gray-600">
                  <HiOutlineDotsVertical /> <Menubar menu={info.menu || []} />
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <span className="text-xs bg-gray-500 p-1 px-4 rounded-lg opacity-50 text-white">
                  Draft
                </span>
                <span className="text-lg group relative text-gray-600">
                  <HiOutlineDotsVertical /> <Menubar menu={info.menu || []} />
                </span>
              </div>
            )
          ) : null}
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
        width: `${size * 5}px`,
        height: `${size * 5}px`,
      }}
    >
      {name.charAt(0)}
    </h3>
  );
}

export default BlogDisplayCard;
