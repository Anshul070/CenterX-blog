import axios from "../utils/axios";
import { useEffect, useState } from "react";

type Blog = {
  title: string;
  content: string;
  createdAt: string;
  id: string;
  published: boolean;
  author: {
    username: string;
    name: string;
    bio? : string;
  };
};

type Post = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  createdAt: string; // or Date if you're converting it to a Date object
  updatedAt: string;
};

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  posts: Post[];
};

//for fetching all the blogs
export const useBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("/blog/bulk/", {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlogs(res.data.posts);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { blogs, loading, error };
};

//For fetching single post by id
export const useBlog = (id: string) => {
  const [blog, setBlog] = useState<Blog>({
    title: "",
    content: "",
    createdAt: "",
    id: "",
    published: false,
    author: {
      username: "",
      bio: "",
      name: "",
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setBlog(res.data);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { blog, loading, error };
};

export const useUserInfo = () => {
  const [user, setUser] = useState<User>({
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    bio: "",
    createdAt: "",
    updatedAt: "",
    posts: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`/user/me/`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const refetchInfo = () => {
    axios
      .get(`/user/me/`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return { user, loading, error, refetchInfo };
};
