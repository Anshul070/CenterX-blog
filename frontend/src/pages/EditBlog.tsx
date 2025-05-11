import BlogCard from "../components/BlogCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router";
import { OrbitProgress } from "react-loading-indicators";

function EditBlog() {
  
  const { id } = useParams();
  const { blog, loading } = useBlog(id as string);
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
    <div>
      <BlogCard
        id={id}
        actionType="edit"
        content={blog.content}
        title={blog.title}
        published={blog.published ? "published" : "draft"}
      />
    </div>
  );
}

export default EditBlog;
