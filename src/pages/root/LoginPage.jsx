import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isLoggedInState, login } from "../../store/auth";
import { useSetRecoilState } from "recoil";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import HeaderPrev from "../../components/common/HeaderPrev";
import TextInput from "../../components/register/TextInput";
import Button from "../../components/common/Button";

const LoginPage = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const location = useLocation();

  const [loginValue, setLoginValue] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {
    console.log(e.target.value);
    setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    login(loginValue)
      .then(() => {
        setIsLoggedIn(true);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => console.error(err));
  };

  const isDisabled = loginValue.id === "" || loginValue.password === "";

  return (
    <WrapContent onSubmit={handleSubmit}>
      {location.state?.alert && alert("로그인이 필요합니다.")}
      <HeaderPrev
        title={
          <>
            <div className="title-big">축제를 200% 즐기기</div>
            <div className="title-small">취향에 맞는 프로필을 골라봐요</div>
          </>
        }
        navigateTo={"/"}
      />

      <div>
        <TextInput
          label="아이디"
          name="id"
          type="text"
          onChange={handleChange}
        />
      </div>

      <div>
        <TextInput
          label="비밀번호"
          name="password"
          type="password"
          onChange={handleChange}
          placeholder={"영문, 숫자, 특수문자 포함 8자리 이상"}
        />
        {/* {idTestFlag && pwTestFlag && (
          <Tip>아이디 혹은 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.</Tip>
        )} */}
      </div>

      <Button size="large" type="submit" disabled={isDisabled}>
        로그인하기
      </Button>
    </WrapContent>
  );
};

export default LoginPage;

const WrapContent = styled.form`
  display: grid;
  gap: 2rem;
  padding: 2rem;
`;
const Tip = styled.small`
  font-size: 12px;
  color: #ff625d;
  font-weight: 700;
`;
