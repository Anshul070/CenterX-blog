import type { UpdateUser } from "@devxhustler/common";
import axios from "./axios";

export const updateUser = async (e: any) => {
  e.preventDefault();
  const formdata: UpdateUser = {
    name: e.target.elements[0].value,
    username: e.target.elements[1].value,
    email: e.target.elements[2].value,
    bio: e.target.elements[3].value,
  };
  console.log(formdata);
  try {
    const res = await axios.put("/user/update/", formdata, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    });
    console.log(res);
  } catch (e) {
    console.log(e);
  }
};
