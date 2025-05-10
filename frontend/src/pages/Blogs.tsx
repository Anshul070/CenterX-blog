import React from "react";
import BlogDisplayCard from "../components/BlogDisplayCard";
import Header from "../components/Header";
import { useBlogs } from "../hooks";
import { getFormattedDate } from "../utils/date";

function Blogs() {
    const { blogs, error, loading } = useBlogs();
    if (loading) {
        return <div className="h-screen bg-white">Loading...</div>;
    }
  return (
    <div className="h-screen bg-white">
        <Header />
        <div className=" px-92">
          {blogs.map((blog) =>{
            return <BlogDisplayCard 
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
