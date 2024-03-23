import { atom } from "recoil";

export const registerDataState = atom({
  key: "registerDataState",
  default: {
    loginId: "",
    password: "",
    checkPassword: "",
    gender: "M",
    telNum: "",
    school: "",
    college: "",
    department: "",
    schoolEmail: "",
    agreeTerms: false,
    agreePrivacy: false,
    mbti: "",
    memberCharacter: "",
    memberHobbyDto: [],
    memberTagDto: [],
  },
});
