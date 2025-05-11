import { useState } from "react";
import { createBlog, updateBlog } from "../utils/handlers";
import { useNavigate } from "react-router";

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
      {error && (
        <div className="absolute w-full top-4 left-0 px-4 sm:px-10 md:px-20 xl:px-52">
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
              <svg
                className="fill-current h-6 w-6 text-red-500"
                role="button"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <title>Close</title>
                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
              </svg>
            </span>
          </div>
        </div>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          cardInfo.actionType === "create"
            ? createBlog(
                { ...info, published: info.published === "published" },
                setError,
                navigate
              )
            : updateBlog(
                { ...info, published: info.published === "published" },
                cardInfo.id ? cardInfo.id : "",
                setError,
                navigate
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