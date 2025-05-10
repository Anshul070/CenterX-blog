import React from "react";
import { useParams } from "react-router";
import { useBlog } from "../hooks";
import Header from "../components/Header";
import { Avatar, Circle } from "../components/BlogCard";
import { getFormattedDate } from "../utils/date";

function Blog() {
  const { id } = useParams();
  const { blog, error, loading } = useBlog(id as string);
  console.log(blog);
  if (loading) {
    return <div className="h-screen bg-white">Loading...</div>;
  }
  return (
    <div className="w-full flex flex-col">
      <Header />
      <div className="flex gap-4 px-52 pt-14">
        <div className="w-2/3 flex flex-col gap-4">
            <h1 className="text-4xl font-bold text-black">{blog.title}</h1>
        <div className="flex items-center gap-6 text-sm">
            <p> Posted on {getFormattedDate(blog.createdAt)}</p>
        </div>
        <p className="text-sm text-justify text-gray-500">
          {blog.content}
        </p>
        </div>
        <div className="w-1/3 flex flex-col gap-6">
        <span className="text-sm">Author</span>
        <div className="flex gap-3 items-center">
            <Avatar name={blog.author.username} size={5} />
            <div className="flex flex-col">
                <h1>{blog.author.username}</h1>
            </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;
