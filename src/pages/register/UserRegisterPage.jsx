import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TextInput from "../../components/register/TextInput";
import Toggle from "../../components/register/Toggle";
import { useRecoilState } from "recoil";
import { registerDataState } from "../../store/registerDataState";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const UserRegisterPage = () => {
  const [registerData, setRegisterData] = useRecoilState(registerDataState);
  const [idTestFlag, setIdTestFlag] = useState(false);
  const [pwTestFlag, setPwTestFlag] = useState(false);
  const [pwConfirmTestFlag, setPwConfirmTestFlag] = useState(false);

  const ID_REGEX = /^[a-z0-9]{5,20}$/;
  const PW_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[\W_]).{8,16}$/;

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });

    if (name === "id") {
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

    if (name === "passwordConfirm") {
      if (value !== registerData.password) {
        setPwConfirmTestFlag(true);
      } else {
        setPwConfirmTestFlag(false);
      }
    }
  };

  useEffect(() => {
    console.log(registerData);
  }, [registerData]);

  return (
    <WrapContent>
      <h2>
        처음 오셨나요?
        <br />
        학생메일로 가입해보세요!
      </h2>

      <div>
        <TextInput
          label="아이디"
          name="id"
          type="text"
          buttonLabel={"중복 확인"}
          value={registerData.id}
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
          name="passwordConfirm"
          type="password"
          value={registerData.passwordConfirm}
          onChange={handleChange}
        />
        {pwConfirmTestFlag && <Tip>비밀번호가 일치하지 않아요.</Tip>}
      </div>

      <Toggle
        label="성별"
        registerData={registerData}
        setRegisterData={setRegisterData}
      />

      <TextInput
        label="전화번호"
        name="tel"
        type="tel"
        value={registerData.tel}
        onChange={handleChange}
      />

      <Button
        bgColor="coral"
        size="large"
        textColor="white"
        onClick={() => {
          navigate("register/univ");
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
