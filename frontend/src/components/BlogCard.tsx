import React, { useState } from "react";
import { createBlog, updateBlog } from "../utils/handlers";

type BlogCardProps = {
  id?: string;
  title?: string;
  content?: string;
  published?: string;
  actionType: "edit" | "create";
};

function BlogCard(cardInfo: BlogCardProps) {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState({
    title: cardInfo.title ? cardInfo.title : "",
    content: cardInfo.content ? cardInfo.content : "",
    published: cardInfo.published ? cardInfo.published : "draft",
  });

  return (
    <div>
      {error && (
        <div className="absolute w-full translate-y-4">
          <div
            className="bg-red-100 border  border-red-400 text-red-700 mx-96 px-4 py-3 rounded relative"
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
                setError
              )
            : updateBlog({ ...info, published: info.published === "published" }, cardInfo.id ? cardInfo.id : "", setError);
        }}
        className="bg-white px-52 py-10 flex flex-col gap-6"
      >
        {/* Title */}
        <input
          value={info.title}
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, title: e.target.value };
            });
          }}
          type="text"
          id="title"
          placeholder="Title"
          className="text-6xl font-serif placeholder:text-gray-400 border-gray-400 outline-none w-full border-x-2  pl-6"
        />
        <textarea
          value={info.content}
          onChange={(e) => {
            setInfo((prev) => {
              return { ...prev, content: e.target.value };
            });
          }}
          id="content"
          placeholder="Tell your story..."
          className="w-full text-3xl min-h-60 font-serif border-x-2 placeholder:text-gray-400 border-gray-400 outline-none pl-6"
          rows={6}
        />
        <div className="flex gap-4 text-sm">
          <select
            onChange={(e) => {
              setInfo((prev) => {
                return { ...prev, published: e.target.value };
              });
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
            className="bg-green-600 w-fit px-6 py-1 text-white rounded-full"
          />
        </div>
      </form>
    </div>
  );
}

export default BlogCard;
