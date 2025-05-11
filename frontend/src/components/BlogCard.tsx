import { useState } from "react";
import { createBlog, updateBlog } from "../utils/handlers";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";

type BlogCardProps = {
  id?: string;
  title?: string;
  content?: string;
  published?: string;
  actionType: "edit" | "create";
};

function BlogCard(cardInfo: BlogCardProps) {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [isPosting, setIsPosting] = useState(false);
  const [info, setInfo] = useState({
    title: cardInfo.title ? cardInfo.title : "",
    content: cardInfo.content ? cardInfo.content : "",
    published: cardInfo.published ? cardInfo.published : "draft",
  });

  // Function to resize the textarea dynamically
  const handleResize = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    target.style.height = "auto"; // Reset height
    target.style.height = `${target.scrollHeight}px`; // Set height based on content
  };

  return (
    <div className="relative">
      {isPosting && (
        <div className="w-full h-screen top-0 fixed flex items-center justify-center bg-gray-300/50 backdrop-blur-[2px]">
          <OrbitProgress
            color="#00000070"
            size="medium"
            text="Posting"
            textColor="#000"
          />
        </div>
      )}
      <div className="fixed z-100 w-full flex justify-center pointer-events-none">
        {error && (
          <div
            className="w-fit h-fit m-4 mt-10 border-red-400 border p-4 text-sm  rounded-lg bg-red-50 text-red-400"
            role="alert"
          >
            <span className="font-medium">Error :</span> {error}
          </div>
        )}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          cardInfo.actionType === "create"
            ? createBlog(
                { ...info, published: info.published === "published" },
                setError,
                navigate,
                setIsPosting
              )
            : updateBlog(
                { ...info, published: info.published === "published" },
                cardInfo.id ? cardInfo.id : "",
                setError,
                navigate,
                setIsPosting
              );
        }}
        className="bg-white w-full mx-auto px-4 sm:px-10 md:px-20 xl:px-52 py-10 flex flex-col gap-6"
      >
        {/* Title */}
        <textarea
          onInput={handleResize}
          value={info.title}
          onChange={(e) => {
            setInfo((prev) => ({
              ...prev,
              title: e.target.value,
            }));
          }}
          id="title"
          placeholder="Title"
          className="text-4xl sm:text-5xl md:text-6xl font-serif placeholder:text-gray-400 border-gray-400 outline-none w-full border-x-2 pl-4 sm:pl-6"
        />

        <textarea
          value={info.content}
          onChange={(e) => {
            setInfo((prev) => ({
              ...prev,
              content: e.target.value,
            }));
          }}
          onInput={handleResize}
          id="content"
          placeholder="Tell your story..."
          className="w-full text-xl sm:text-2xl md:text-3xl min-h-60 font-serif border-x-2 placeholder:text-gray-400 border-gray-400 outline-none pl-4 sm:pl-6 resize-none" // Prevent manual resizing
          rows={6}
        />

        <div className="flex flex-wrap gap-4 text-sm">
          <select
            onChange={(e) => {
              setInfo((prev) => ({
                ...prev,
                published: e.target.value,
              }));
            }}
            className="appearance-none outline-0 px-4 py-2 border rounded-full text-center text-gray-500"
            defaultValue={info.published}
            name="published"
            id="published"
          >
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <input
            type="submit"
            className="bg-green-600 w-fit px-6 py-2 text-white rounded-full cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default BlogCard;
