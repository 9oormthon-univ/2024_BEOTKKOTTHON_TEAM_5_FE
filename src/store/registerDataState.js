import { atom } from "recoil";

export const registerDataState = atom({
  key: "registerDataState",
  default: {
    id: "",
    password: "",
    passwordConfirm: "",
    gender: "M",
    tel: "",
    univ: "",
    college: "",
    department: "",
    email: "",
    agreeTerms: false,
    agreePrivacy: false,
  },
});
