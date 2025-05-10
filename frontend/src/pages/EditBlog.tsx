import Header from "../components/Header";
import BlogCard from "../components/BlogCard";
import { useBlog } from "../hooks";
import { useParams } from "react-router";

function EditBlog() {
  const { id } = useParams();
  const { blog, loading } = useBlog(id as string);
  if (loading) {
    return <div className="h-screen bg-white">Loading...</div>;
  }
  return (
    <div>
      <Header />
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
