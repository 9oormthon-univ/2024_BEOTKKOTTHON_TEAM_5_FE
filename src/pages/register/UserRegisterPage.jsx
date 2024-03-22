import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../../components/register/TextInput";
import Toggle from "../../components/register/Toggle";
import { useRecoilState } from "recoil";
import { registerDataState } from "../../store/registerDataState";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import HeaderPrev from "../../components/common/HeaderPrev";
import { defaultInstance } from "../../api/instance";

const UserRegisterPage = () => {
  const [registerData, setRegisterData] = useRecoilState(registerDataState);
  const [idTestFlag, setIdTestFlag] = useState(false);
  const [pwTestFlag, setPwTestFlag] = useState(false);
  const [checkPwTestFlag, setCheckPwTestFlag] = useState(false);
  const [toggleState, setToggleState] = useState("");

  const ID_REGEX = /^[a-z0-9]{5,20}$/;
  const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  const navigate = useNavigate();

  const checkId = async () => {
    defaultInstance
      .post("/member/check/id", {
        loginId: registerData.loginId,
      })
      .then((res) => {
        if (res.data) {
          alert("사용 가능한 아이디입니다.");
        } else {
          alert("이미 사용중인 아이디입니다.");
        }
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });

    if (name === "loginId") {
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

    if (name === "checkPassword") {
      if (value !== registerData.password) {
        setCheckPwTestFlag(true);
      } else {
        setCheckPwTestFlag(false);
      }
    }
  };

  const isDisabled =
    idTestFlag ||
    pwTestFlag ||
    checkPwTestFlag ||
    !toggleState ||
    !registerData.telNum;

  useEffect(() => {
    console.log(registerData);
  }, [registerData]);

  useEffect(() => {
    setRegisterData((prev) => ({
      ...prev,
      gender: toggleState,
    }));
  }, [toggleState]);

  return (
    <WrapContent>
      <HeaderPrev
        title={
          <>
            처음 오셨나요?
            <br />
            학생메일로 가입해보세요!
          </>
        }
        navigateTo="/"
      />

      <div>
        <TextInput
          label="아이디"
          name="loginId"
          type="text"
          buttonLabel={"중복 확인"}
          buttonClickHandler={checkId}
          value={registerData.loginId}
          onChange={handleChange}
        />
        {idTestFlag && (
          <Tip>영어, 숫자 조합 5자 이상 20자 이하로 작성해야 해요.</Tip>
        )}
      </div>

      <div>
        <TextInput
          label="비밀번호"
          name="password"
          type="password"
          value={registerData.password}
          onChange={handleChange}
        />
        {pwTestFlag && (
          <Tip>
            영어, 숫자, 특수문자 조합 8자 이상 16자 이하로 작성해야 해요.
          </Tip>
        )}
      </div>

      <div>
        <TextInput
          label="비밀번호 확인"
          name="checkPassword"
          type="password"
          value={registerData.checkPassword}
          onChange={handleChange}
        />
        {checkPwTestFlag && <Tip>비밀번호가 일치하지 않아요.</Tip>}
      </div>

      <Toggle
        label="성별"
        setState={setToggleState}
        registerData={registerData}
        setRegisterData={setRegisterData}
      />

      <TextInput
        label="전화번호"
        name="telNum"
        type="number"
        placeholder="예시) 01012345678"
        value={registerData.telNum}
        onChange={handleChange}
      />

      <Button
        size="large"
        disabled={isDisabled}
        onClick={() => {
          navigate("/register/univ");
        }}>
        학교 선택하기
      </Button>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
`;

const Tip = styled.small`
  font-size: 12px;
  color: #90949b;
  font-weight: 700;
`;

export default UserRegisterPage;
