import type { UpdateUser, CreatePost } from "@devxhustler/common";
import axios from "./axios";

export const updateUser = async (e: any, initialInfo: UpdateUser) => {
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
    if (formdata[key as keyof UpdateUser] !== initialInfo[key as keyof UpdateUser] && formdata[key as keyof UpdateUser] !== "" ) {
      updatedFields[key as keyof UpdateUser] = formdata[key as keyof UpdateUser];
    }
  }

  // Check if there are any updated fields
  if (Object.keys(updatedFields).length === 0) {
    return;
  }

  // Uncomment when ready to send
  try {
    await axios.put("/user/update/", updatedFields, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const changePostStatus = async (id: string, published: boolean, refetchInfo : () => void) => {
  try {
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
  }
}

export const deletePost = async (id: string, refetchInfo : () => void) => {
  try {
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
    console.error(err);
  }
};

export const createBlog = async(info: CreatePost, setError : any, navigate : any) => {
  if (!info.title || !info.content) {
    errorSetter(setError, "Title and content are required" )
    return;
  }
  try {
    const res = await axios.post(`/blog/new/`,info, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    
    if(res.status === 200) {
      navigate(`/blogs/${res.data.post.id}`);
    }
  } catch (err) {
    errorSetter(setError, "Something went wrong");
    console.error(err);
  }
}

export const updateBlog = async(info: CreatePost,id : string, setError : any, navigate : any) => {
  if (!info.title || !info.content) {
    errorSetter(setError, "Title and content are required" )
    return;
  }
  try {
    const res = await axios.put(`/blog/${id}/update`,info, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });

    if(res.status === 200) {
      navigate(`/blogs/${id}`);
    }
  } catch (err) {
    errorSetter(setError, "Something went wrong");
    console.error(err);
  }  
}

export const logout = async () => {
  localStorage.removeItem("token");
}

const errorSetter = (setError: any, message: string) => {
  setError(message);
  setTimeout(() => {
    setError(null);
  }, 2000)
}