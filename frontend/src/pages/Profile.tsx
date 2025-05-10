import Header from "../components/Header";
import { useUserInfo } from "../hooks";
import BlogDisplayCard, { Avatar } from "../components/BlogDisplayCard";
import { getFormattedDate } from "../utils/date";
import { useEffect, useState } from "react";
import { changePostStatus, deletePost, updateUser } from "../utils/handlers";
import { useNavigate } from "react-router";

function Profile() {
  const navigate = useNavigate()
  const { error, loading, user } = useUserInfo();
  const [userInfo, setUserInfo] = useState<{ field: string; value: string }[]>(
    []
  );
  const initalInfo = {
    name: user.name,
    username: user.username,
    email: user.email,
    bio: user.bio,
  };

  useEffect(() => {
    setUserInfo([
      {
        field: "Name",
        value: user.name,
      },
      {
        field: "Username",
        value: user.username,
      },
      {
        field: "Email",
        value: user.email,
      },
      {
        field: "Bio",
        value: user.bio,
      },
    ]);
  }, [user]);

  if (loading) {
    return <div className="h-screen bg-white">Loading...</div>;
  }
  return (
    <section>
      <Header />
      <div className="flex gap-10 px-52 pt-14">
        <div className=" w-4/5 flex flex-col gap-4">
          <h1 className="text-6xl font-bold text-black">{user.name}</h1>
          <p className="opacity-60">{user.bio}</p>
          <p className="text-sm ">
            {" "}
            Joined on {getFormattedDate(user.createdAt)}
          </p>
          <div className="flex items-center gap-6 text-sm mt-6">
            <p className="mt-10">All Posts</p>
          </div>
          <hr className="border-gray-200" />
          <div className="w-full flex flex-col">
            {user.posts.map((blog) => (
              <BlogDisplayCard
                authorName={user.username}
                content={blog.content}
                createdAt={blog.createdAt}
                id={blog.id}
                title={blog.title}
                key={blog.id}
                published={blog.published}
                menu={[
                  {
                    title: blog.published ? "Draft" : "Publish",
                    action: () => changePostStatus(blog.id, blog.published),
                  },
                  {
                    title: "Delete",
                    action: () => deletePost(blog.id),
                  },
                  {
                    title: "Update",
                    action: () => {navigate(`/blogs/update/${blog.id}`);},
                  },
                ]}
              />
            ))}
          </div>
        </div>
        <div className="w-4/12 border-l border-gray-200  flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <h1 className="flex justify-center rounded items-center bg-indigo-600 text-white w-full h-20">
              Profile Information
            </h1>
            <form
              onSubmit={(e) => {
                updateUser(e, initalInfo);
              }}
              className="flex flex-col gap-3 pl-4"
            >
              {userInfo.map((info, index) => (
                <label
                  key={index}
                  className="flex flex-col text-zinc-700 font-semibold mb-2"
                  htmlFor={info.field}
                >
                  {info.field}
                  <input
                    onChange={(e) => {
                      const newUserInfo = [...userInfo];
                      newUserInfo[index].value = e.target.value;
                      setUserInfo(newUserInfo);
                    }}
                    id={info.field}
                    type={info.field}
                    value={info.value ? info.value : ""}
                    className="border font-normal text-sm text-zinc-500 mt-1 border-gray-300 p-2 mb-4 rounded"
                  />
                </label>
              ))}
              <button
                type="submit"
                className="border border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 mx-10 py-2 rounded"
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
