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
    style: string;
    loading? : boolean
  }[];
}

function BlogDisplayCard(info: BlogDisplayCardProps) {
  const navigate = useNavigate();
  return (
    <div
      className="w-full flex flex-col gap-4 pt-6 cursor-pointer"
      onClick={(e) => {
        e.stopPropagation();
        navigate(`/blogs/${info.id}`);
      }}
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-sm flex-wrap">
          <Avatar name={info.authorName} />
          <div className="flex-col sm:flex-row flex sm:gap-2">
            <span>{info.authorName}</span>
            <span className="flex items-center gap-1 opacity-50 text-[10px] md:text-sm">
              {Circle()}
              {getFormattedDate(info.createdAt)}
            </span>
          </div>
        </div>
        {info.published !== undefined && (
          <div className="flex items-center gap-2 z-10">
            <span
              className={`text-xs sm:text-sm px-3 py-1 rounded-lg text-white ${
                info.published ? "bg-blue-500" : "bg-gray-500"
              } opacity-50`}
            >
              {info.published ? "Published" : "Draft"}
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="text-lg group bg-re-500 relative text-gray-600"
            >
              <HiOutlineDotsVertical />
              <Menubar menu={info.menu || []} />
            </span>
          </div>
        )}
      </div>

      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-black break-words">
        {info.title}
      </h1>
      <p className="text-sm sm:text-base text-justify text-gray-500">
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
      className="bg-indigo-600 rounded-full text-white flex items-center justify-center text-sm font-semibold"
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
