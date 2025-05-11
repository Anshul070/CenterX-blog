import Header from "../components/Header";
import { useUserInfo } from "../hooks";
import BlogDisplayCard from "../components/BlogDisplayCard";
import { getFormattedDate } from "../utils/date";
import { useEffect, useState } from "react";
import { changePostStatus, deletePost, updateUser } from "../utils/handlers";
import { useNavigate } from "react-router";
import { OrbitProgress } from "react-loading-indicators";

function Profile() {
  const navigate = useNavigate();
  const { loading, user, refetchInfo } = useUserInfo();

  const [userInfo, setUserInfo] = useState<{ field: string; value: string }[]>(
    []
  );
  const [activeSection, setActiveSection] = useState<"posts" | "profile">(
    "posts"
  );

  const initialInfo = loading
    ? {}
    : {
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
      };

  useEffect(() => {
    if (!loading && user) {
      setUserInfo([
        { field: "Name", value: user.name },
        { field: "Username", value: user.username },
        { field: "Email", value: user.email },
        { field: "Bio", value: user.bio },
      ]);
    }
  }, [user, loading]);

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
    <section className="bg-white min-h-screen">
      <Header />

      <div className="flex flex-col lg:flex-row gap-10 px-4 sm:px-10 md:px-20 lg:px-32 pt-6">
        {/* Left Column (Posts) */}
        <div
          className={`
            w-full lg:w-3/5 flex flex-col gap-6
          `}
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-black">
              {user.name}
            </h1>
            <p className="text-gray-600 mt-2">{user.bio}</p>
            <p className="text-sm text-gray-400 mt-1">
              Joined on {getFormattedDate(user.createdAt)}
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="lg:hidden flex justify-center gap-4 py-4">
              <button
                onClick={() => setActiveSection("posts")}
                className={`px-4 py-2 font-semibold text-gray-700 ${
                  activeSection === "profile"
                    ? "border-b-0"
                    : "border-b-2 border-gray-300"
                }`}
              >
                Posts
              </button>
              <button
                onClick={() => setActiveSection("profile")}
                className={`px-4 py-2  font-semibold text-gray-700 ${
                  activeSection === "profile"
                    ? "border-b-2 border-gray-300"
                    : "border-0 "
                }`}
              >
                Profile Info
              </button>
            </div>
          </div>
          <div
            className={`
              w-full flex flex-col gap-6 
              ${activeSection === "posts" ? "block" : "hidden"} 
              lg:block
              `}
          >
            <hr className="border-gray-200" />
            {user.posts.map((blog) => (
              <BlogDisplayCard
                key={blog.id}
                id={blog.id}
                authorName={user.name}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                published={blog.published}
                menu={[
                  {
                    title: blog.published ? "Draft" : "Publish",
                    action: () => changePostStatus(blog.id, blog.published, refetchInfo),
                    style: "text-gray-700",
                  },
                  {
                    title: "Update",
                    action: () => navigate(`/blogs/update/${blog.id}`),
                    style: "text-blue-600",
                  },
                  {
                    title: "Delete",
                    action: () => deletePost(blog.id, refetchInfo),
                    style: "text-red-600",
                  },
                ]}
              />
            ))}
          </div>
        </div>

        {/* Right Column (Profile Info) */}
        <div
          className={`
            w-full lg:w-2/5 border-t lg:border-t-0 lg:border-l border-gray-200 lg:pt-0 lg:pl-6 flex flex-col gap-6 
            ${activeSection === "profile" ? "block" : "hidden"} 
            lg:block
          `}
        >
          <div className="flex flex-col gap-4">
            <h2 className="bg-indigo-600 text-white text-center py-4 text-lg rounded">
              Profile Information
            </h2>
            <form
              onSubmit={(e) => updateUser(e, initialInfo)}
              className="flex flex-col gap-4"
            >
              {userInfo.map((info, index) => (
                <label
                  key={index}
                  htmlFor={info.field}
                  className="flex flex-col text-sm font-medium text-gray-700"
                >
                  {info.field}
                  <input
                    id={info.field}
                    type="text"
                    value={info.value}
                    onChange={(e) => {
                      const newInfo = [...userInfo];
                      newInfo[index].value = e.target.value;
                      setUserInfo(newInfo);
                    }}
                    className="border border-gray-300 rounded px-3 py-2 mt-1 text-gray-600"
                  />
                </label>
              ))}
              <button
                type="submit"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-200 px-4 py-2 rounded self-center"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
