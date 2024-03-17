import axios from "axios";
import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: localStorage.getItem("token") ? true : false,
});

export const login = async (value) => {
  const response = await axios.post("http://43.202.149.135:8080/login", {
    loginId: value.id,
    password: value.password,
  });

  const { token } = response.data;

  localStorage.setItem("token", token);
};
