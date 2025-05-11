import { OrbitProgress } from "react-loading-indicators";
import BlogDisplayCard from "../components/BlogDisplayCard";
import Header from "../components/Header";
import { useBlogs } from "../hooks";
import { useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function Blogs() {
  const { blogs, loading } = useBlogs();
  const location = useLocation();
  const name = location.state?.name;
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log(name)
    if (name) {
        if (name === "Unknown") {
          setMessage(
            "Please complete your profile by adding your name and bio."
          );
          setTimeout(() => {
            setMessage("");
          }, 10000);
        }
        navigate(location.pathname, { replace: true, state: {} });
    }
  }, [name]);

  if (loading) {
    return (
      <div className="h-screen bg-white flex items-center justify-center">
        <OrbitProgress
          color="#00000070"
          size="medium"
          text="Loading"
          textColor="#000"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="px-4 sm:px-6 md:px-20 lg:px-40 xl:px-60 py-6 flex flex-col gap-8">
        {message && (
          <div
            className="bg-blue-100 absolute -left-[-50%] -translate-x-[50%] w-fit border-t border-b border-blue-500 text-blue-700 px-4 py-3"
            role="alert"
          >
            <p className="font-bold">Informational message</p>
            <p className="text-sm">
              {message}
            </p>
          </div>
        )}
        {blogs?.map((blog) => (
          <BlogDisplayCard
            key={blog.id}
            id={blog.id}
            authorName={blog.author.name}
            title={blog.title}
            content={blog.content}
            createdAt={blog.createdAt}
          />
        ))}
      </div>
    </div>
  );
}

export default Blogs;
