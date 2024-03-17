import { atom } from "recoil";

export const urlState = atom({
  key: 'urlState',
  default: 'http://43.202.149.135:8080',
});