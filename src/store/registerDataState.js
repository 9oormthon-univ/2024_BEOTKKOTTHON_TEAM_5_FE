import { atom } from "recoil";

export const registerDataState = atom({
  key: "registerDataState",
  default: {
    id: "",
    password: "",
    passwordConfirm: "",
    gender: "",
    tel: "",
    university: "",
    college: "",
    department: "",
  },
});
