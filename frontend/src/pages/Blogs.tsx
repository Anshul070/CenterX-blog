import React from "react";
import BlogCard from "../components/BlogCard";
import Header from "../components/Header";
import { useBlogs } from "../hooks";
import { getFormattedDate } from "../utils/date";

function Blogs() {
    const { blogs, error, loading } = useBlogs();
    if (loading) {
        return <div className="h-screen bg-white">Loading...</div>;
    }
    console.log(blogs);
  return (
    <div className="h-screen bg-white">
        <Header />
        <div className=" px-92 pt-6">
          {blogs.map((blog) =>{
            return <BlogCard 
            key={blog.id}
            id={blog.id}
            authorName={blog.author.username}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
            />
        })}
        </div>
    </div>
  );
}

export default Blogs;
