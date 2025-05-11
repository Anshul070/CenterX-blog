import type { UpdateUser, CreatePost } from "@devxhustler/common";
import axios from "./axios";

export const updateUser = async (
  e: any,
  initialInfo: UpdateUser,
  refetchInfo: () => void,
  setIsProfileUpdating: React.Dispatch<
    React.SetStateAction<{
      isUpdating: boolean;
      message: string;
      errorMsg: string;
    }>
  >
) => {
  setIsProfileUpdating((prev) => {
    return { ...prev, isUpdating: true };
  });
  e.preventDefault();

  const formdata: UpdateUser = {
    name: e.target.elements[0].value,
    username: e.target.elements[1].value,
    email: e.target.elements[2].value,
    bio: e.target.elements[3].value,
  };

  // Create object with only updated fields
  const updatedFields: Partial<UpdateUser> = {};

  for (const key in formdata) {
    if (
      formdata[key as keyof UpdateUser] !==
        initialInfo[key as keyof UpdateUser] &&
      formdata[key as keyof UpdateUser] !== ""
    ) {
      updatedFields[key as keyof UpdateUser] =
        formdata[key as keyof UpdateUser];
    }
  }

  // Check if there are any updated fields
  if (Object.keys(updatedFields).length === 0) {
    UpdateSetter(
      setIsProfileUpdating,
      "Please change fields values first.",
      false,
      ""
    );
    return;
  }

  // Uncomment when ready to send
  try {
    await axios.put("/user/update/", updatedFields, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    refetchInfo();
  } catch (err) {
    console.error(err);
    UpdateSetter(setIsProfileUpdating, "", false, "Some error occured");
  }
  UpdateSetter(setIsProfileUpdating, "User Info Updated", false, "");
};

export const changePostStatus = async (
  id: string,
  published: boolean,
  refetchInfo: () => void,
  setPostStatus: React.Dispatch<
    React.SetStateAction<{
      isUpdating: boolean;
      message: string;
      errorMsg: string;
    }>
  >
) => {
  try {
    setPostStatus((pre) => ({ ...pre, isUpdating: true }));
    UpdateSetter(setPostStatus, "", true, "");
    await axios.put(
      `/blog/${id}/update`,
      { published: !published },
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );
    refetchInfo();
  } catch (err) {
    console.error("Something went wrong");
    console.error(err);
    UpdateSetter(setPostStatus, "", false, "there is some error");
  }
  UpdateSetter(setPostStatus, "Status changed", false, "");
};

export const deletePost = async (
  id: string,
  refetchInfo: () => void,
  setPostDeleting: React.Dispatch<
    React.SetStateAction<{
      isUpdating: boolean;
      message: string;
      errorMsg: string;
    }>
  >
) => {
  try {
    setPostDeleting((pre) => ({ ...pre, isUpdating: true }));

    const res = await axios.delete(`/blog/${id}/delete`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    if (res.status === 200) {
      refetchInfo();
    }
  } catch (err) {
    console.error("Something went wrong");
    UpdateSetter(setPostDeleting, "", false, "there is some error");
  }
    UpdateSetter(setPostDeleting, "Post deleted Successfully", false, "");
};

export const createBlog = async (
  info: CreatePost,
  setError: any,
  navigate: any,
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!info.title || !info.content) {
    errorSetter(setError, "Title and content are required");
    return;
  }
  try {
    setIsPosting(true);
    const res = await axios.post(`/blog/new/`, info, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      navigate(`/blogs/${res.data.post.id}`);
    }
  } catch (err) {
    errorSetter(setError, "Something went wrong");
    setIsPosting(false);
  }
    setIsPosting(false);
};

export const updateBlog = async (
  info: CreatePost,
  id: string,
  setError: any,
  navigate: any,
  setIsPosting: React.Dispatch<React.SetStateAction<boolean>>
) => {
  if (!info.title || !info.content) {
    errorSetter(setError, "Title and content are required");
    return;
  }
  setIsPosting(true);
  try {
    const res = await axios.put(`/blog/${id}/update`, info, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if (res.status === 200) {
      navigate(`/blogs/${id}`);
    }
  } catch (err) {
    errorSetter(setError, "Something went wrong");
    setIsPosting(false);
  }
    setIsPosting(false);
};

export const logout = async () => {
  localStorage.removeItem("token");
};

const errorSetter = (setError: any, message: string) => {
  setError(message);
  setTimeout(() => {
    setError(null);
  }, 4000);
};

const UpdateSetter = (
  setter: any,
  message: string,
  isUpdating: boolean,
  errorMsg: string
) => {
  setter({ message: message, isUpdating, errorMsg });
  setTimeout(() => {
    setter(
      (pre: { message: string; isUpdating: boolean; errorMsg: string }) => ({
        ...pre,
        message: "",
        errorMsg: "",
      })
    );
  }, 4000);
};
