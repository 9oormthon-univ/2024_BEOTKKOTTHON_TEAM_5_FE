import { atom } from "recoil";
import { defaultInstance } from '../store/api';

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: localStorage.getItem("token") ? true : false,
});

export const login = async (value) => {
  const response = await defaultInstance.post("/login", {
    loginId: value.id,
    password: value.password,
  });

  const { token } = response.data;

  localStorage.setItem("token", token);
};
