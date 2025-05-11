import { useParams } from "react-router";
import { useBlog } from "../hooks";
import { Avatar } from "../components/BlogDisplayCard";
import { getFormattedDate } from "../utils/date";
import { OrbitProgress } from "react-loading-indicators";

function Blog() {
  const { id } = useParams();
  const { blog, error, loading } = useBlog(id as string);

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

  if (error) {
    return <div className="h-screen bg-white">Error</div>;
  }

  return (
    <div className="w-full flex flex-col min-h-screen bg-white">
      <div className="px-6 sm:px-8 md:px-16 lg:px-28 xl:px-40 pt-10 pb-20">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Main Content */}
          <div className="lg:w-8/12 flex flex-col gap-6">
            <h1 className="text-3xl sm:text-4xl lg:text-4xl font-bold text-black">{blog.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <p>Posted on {getFormattedDate(blog.createdAt)}</p>
            </div>
            <div className="text-sm text-gray-700 leading-relaxed">
              {blog.content.split("\n\n").map((para, idx) => (
                <p key={idx} className="mb-4">
                  {para}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar - Author Info */}
          <div className="lg:w-4/12 flex flex-col gap-6 border-t lg:border-t-0 lg:border-l border-gray-200 pt-6 lg:pt-0 pl-0 lg:pl-6">
            <span className="text-sm font-medium text-gray-500">Author</span>
            <div className="flex gap-4 items-center">
              <Avatar name={blog.author.username} size={5} />
              <div className="flex flex-col">
                <h1 className="font-semibold text-gray-800">{blog.author.name}</h1>
                <h1 className="font-semibold text-xs text-gray-400">{blog.author.username.toLowerCase()}</h1>
              </div>
            </div>
            <p className="block text-sm text-wrap w-1/2 text-gray-500">{blog.author.bio?.split(" ").map(word => {
              if(word.length > 19) {
                return word.slice(0, 18) + "... "
              } 
              return word + " "
            })}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Blog;