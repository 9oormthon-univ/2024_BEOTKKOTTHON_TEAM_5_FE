import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInState, login } from "../../store/auth";
import { useSetRecoilState } from "recoil";

const LoginPage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  const [value, setValue] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(value)
      .then(() => {
        setIsLoggedIn(true);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.error(err));
  };

  const isDisabled = value.id === "" || value.password === "";

  return (
    <div>
      <Link to={"/"}>홈으로</Link>
      <h1>로그인 페이지</h1>
      <p>아이디와 비밀번호를 입력해주세요.</p>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="아이디"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <button type="submit" disabled={isDisabled}>
          로그인
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
