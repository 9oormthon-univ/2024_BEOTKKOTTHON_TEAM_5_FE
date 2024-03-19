import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedInState, login } from "../../store/auth";
import { useSetRecoilState } from "recoil";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import HeaderPrev from "../../components/common/HeaderPrev";
import TextInput from "../../components/register/TextInput";
import Button from "../../components/common/Button";


const LoginPage = () => {

  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(isLoggedInState);
  const location = useLocation();

  const [idTestFlag, setIdTestFlag] = useState(false);
  const [pwTestFlag, setPwTestFlag] = useState(false);
  const [loginResult, setLoginResult] = useState();
  const [showWarning, setShowWarning] = useState();

  const ID_REGEX = /^[a-z0-9]{5,20}$/;
  const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  const [loginValue, setLoginValue] = useState({
    id: "",
    password: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    if(name === "id") {
      if (ID_REGEX.test(value)) {
        setIdTestFlag(false);
      } else {
        setIdTestFlag(true);
      }
    }

    if (name === "password") {
      if (PW_REGEX.test(value)) {
        setPwTestFlag(false);
      } else {
        setPwTestFlag(true);
      }
    }

    !idTestFlag && !pwTestFlag && setLoginValue({
      ...loginValue,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = login(loginValue)
      .then(() => {
        setIsLoggedIn(true);
      })
      .then(() => {
        navigate("/home");
      })
      .catch((err) => err.response.data);
      setLoginResult(result);
  };

  return (
    <WrapForm onSubmit={handleSubmit}>
      <WrapContent>

        {location.state?.alert && alert("로그인이 필요합니다.")}
        <HeaderPrev
          title={
            <>
              <div className="title-big">축제를 200% 즐기기</div>
              <div className="title-small">취향에 맞는 프로필을 골라봐요</div>
            </>
          } navigateTo={"/"} />

        <div>
          <TextInput
            label="아이디"
            name="id"
            type="text"
            onChange={handleChange}
            placeholder={"영어, 숫자 조합 5자 이상 20자 이하"}
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
          {(loginResult!==200) && (
          <Tip>아이디 혹은 비밀번호를 잘못 입력하셨습니다. 다시 입력해주세요.</Tip>
        )}
        </div>

      </WrapContent>
      <WrapText>
        비밀번호를 잊으셨나요?<span>비밀번호 찾기</span>
      </WrapText>


      <Button 
        size="large" 
        type="submit"
        >
        로그인하기
      </Button>
    </WrapForm>
  );
};

export default LoginPage;

const WrapForm = styled.form`
  padding: 2rem;
`;
const WrapContent = styled.div`
  display: grid;
  gap: 2rem;

`;
const WrapText = styled.div`
  display: flex;  
  justify-content: center;
  color: #979797;
  padding: 1rem 0 4rem 0;

  span {
    color: #000000;
    font-weight: 700;
  }
  
`;
const Tip = styled.small`
  font-size: 12px;
  color: #FF625D;
  font-weight: 700;
`;