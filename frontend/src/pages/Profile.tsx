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
  const [ProfileUpdating, setProfileUpdating] = useState({
    isUpdating: false,
    message: "",
    errorMsg: ""
  });
  const [postStatus, setPostStatus] = useState({
    isUpdating: false,
    message: "",
    errorMsg: ""
  });
  const [postDeleting, setPostDeleting] = useState({
    isUpdating: false,
    message: "",
    errorMsg: ""
  });

  const [userInfo, setUserInfo] = useState<{ field: string; value: string }[]>(
    []
  );
  const [activeSection, setActiveSection] = useState<"posts" | "profile">(
    "profile"
  );
  console.log(ProfileUpdating.message)

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
      <div className="fixed z-100 w-full flex justify-center pointer-events-none">
        {ProfileUpdating.message !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-green-400 border p-4 text-sm  rounded-lg bg-green-50 text-green-400"
            role="alert"
          >
            <span className="font-medium">Sucess:</span>{" "}
            {ProfileUpdating.message}
          </div>
        )}
        {ProfileUpdating.errorMsg !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-red-400 border p-4 text-sm  rounded-lg bg-red-50 text-red-400"
            role="alert"
          >
            <span className="font-medium">Error:</span>{" "}
            {ProfileUpdating.errorMsg}
          </div>
        )}
        {postStatus.message !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-green-400 border p-4 text-sm  rounded-lg bg-green-50 text-green-400"
            role="alert"
          >
            <span className="font-medium">Sucess:</span>{" "}
            {postStatus.message}
          </div>
        )}
        {postStatus.errorMsg !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-red-400 border p-4 text-sm  rounded-lg bg-red-50 text-red-400"
            role="alert"
          >
            <span className="font-medium">Error:</span>{" "}
            {postStatus.errorMsg}
          </div>
        )}
        {postDeleting.message !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-green-400 border p-4 text-sm  rounded-lg bg-green-50 text-green-400"
            role="alert"
          >
            <span className="font-medium">Sucess:</span>{" "}
            {postDeleting.message}
          </div>
        )}
        {postDeleting.errorMsg !=="" && (
          <div
            className="w-fit h-fit m-4 mt-10 border-red-400 border p-4 text-sm  rounded-lg bg-red-50 text-red-400"
            role="alert"
          >
            <span className="font-medium">Error:</span>{" "}
            {postDeleting.errorMsg}
          </div>
        )}
      </div>

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
                onClick={() => setActiveSection("profile")}
                className={`px-4 py-2  font-semibold text-gray-700 ${
                  activeSection === "profile"
                    ? "border-b-2 border-gray-300"
                    : "border-0 "
                }`}
              >
                Profile Info
              </button>
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
                    action: () =>
                      !postStatus.isUpdating && changePostStatus(blog.id, blog.published, refetchInfo, setPostStatus),
                    style: "text-gray-700",
                    loading : postStatus.isUpdating
                  },
                  {
                    title: "Update",
                    action: () => navigate(`/blogs/update/${blog.id}`),
                    style: "text-blue-600",
                  },
                  {
                    title: "Delete",
                    action: () => !postDeleting.isUpdating && deletePost(blog.id, refetchInfo, setPostDeleting),
                    style: "text-red-600",
                    loading: postDeleting.isUpdating
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
          <div className="flex flex-col gap-4 relative">
            {ProfileUpdating.isUpdating && (
              <div className="w-[104%] h-[104%] -translate-x-[50%] -left-[-50%] -translate-y-[50%] -top-[-50%] rounded absolute bg-gray-300/50 backdrop-blur-[2px] flex items-center justify-center">
                <OrbitProgress
                  color="#00000070"
                  size="small"
                  text="Loading"
                  textColor="#000"
                />
              </div>
            )}
            <h2 className="bg-indigo-600 text-white text-center py-4 text-lg rounded">
              Profile Information
            </h2>
            <form
              onSubmit={(e) =>
                updateUser(e, initialInfo, refetchInfo, setProfileUpdating)
              }
              className="flex flex-col gap-4"
            >
              {userInfo.map((info, index) => (
                <label
                  key={index}
                  htmlFor={info.field}
                  className="flex flex-col text-sm font-medium text-gray-700"
                >
                  {info.field}
                  {info.field !== "Bio" ? (
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
                  ) : (
                    <textarea
                      id={info.field}
                      value={info.value}
                      onChange={(e) => {
                        const newInfo = [...userInfo];
                        newInfo[index].value = e.target.value;
                        setUserInfo(newInfo);
                      }}
                      className="border min-h-46 border-gray-300 rounded px-3 py-2 mt-1 text-gray-600"
                    />
                  )}
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
