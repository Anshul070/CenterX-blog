import { OrbitProgress } from "react-loading-indicators";
import BlogDisplayCard from "../components/BlogDisplayCard";
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
    <div className="bg-white">
      <div className="px-4 sm:px-6 md:px-20 lg:px-40 xl:px-60 py-6 flex flex-col gap-8">
        <div className="fixed z-100 w-full flex justify-center pointer-events-none">
        {message && (
          <div
            className="w-fit h-fit m-4 mt-10 border-yellow-400 border p-4 text-sm  rounded-lg bg-yellow-50 text-yellow-400"
            role="alert"
          >
            <span className="font-medium">Informational :</span> {message}
          </div>
        )}
      </div>
        {blogs.length === 0 && <h1 className="flex justify-center mt-20">There are no blogs. Be the first one to write a blog on our website.</h1> }
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
