import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dropdown from "../../components/register/Dropdown";
import Checkbox from "../../components/common/Checkbox";
import { useRecoilState } from "recoil";
import { registerDataState } from "../../store/registerDataState";
import TextInput from "../../components/register/TextInput";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";
import { authInstance, defaultInstance } from "../../api/instance";
import HeaderPrev from "../../components/common/HeaderPrev";

const UnivRegisterPage = () => {
  const [registerData, setRegisterData] = useRecoilState(registerDataState);
  const [school, setSchool] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [emailButtonLabel, setEmailButtonLabel] = useState("메일 중복 확인");
  const [emailCertify, setEmailCertify] = useState(false);
  const [certificationValue, setCertificationValue] = useState("");
  const [registerComplete, setRegisterComplete] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "schoolEmail") { setEmailButtonLabel("메일 중복 확인") }
    setEmailCertify(false);
    setRegisterData({ ...registerData, [name]: value });
  };
  const handleChangeCertification = (e) => {
    setCertificationValue(e.target.value);
    //이메일 인증 번호 보내는 api 함수 호출
  };

  const handleChecked = (e) => {
    const { name, checked } = e.target;
    setRegisterData({ ...registerData, [name]: checked });
  };

  useEffect(() => {
    setRegisterData((prev) => ({ ...prev, school, college, department }));
  }, [school, college, department]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await defaultInstance
      .post("/member/signup", {
        loginId: registerData.loginId,
        password: registerData.password,
        checkPassword: registerData.checkPassword,
        gender: registerData.gender,
        telNum: registerData.telNum,
        school: registerData.school,
        college: registerData.college,
        department: registerData.department,
        schoolEmail: registerData.schoolEmail,
      })
      .then((res) => {
        if (res.status === 200) {
          navigate("/register/done", {
            state: {
              loginId: registerData.loginId,
              password: registerData.password,
            },
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isDisabled = 
    !registerData.agreeTerms ||
    !registerData.agreePrivacy ||
    !registerComplete;

  const emailIsDisabled =
    !registerData.school ||
    !registerData.college ||
    !registerData.department ||
    !registerData.schoolEmail ||
    emailCertify;

  const UNIV_PLACEHOLDER = "학교를 선택해주세요.";
  const UNIV_TYPES = [
    "국민대학교",
    "서울여자대학교",
    "순천향대학교",
    "전남대학교",
    "한국외국어대학교(글로벌)",
  ];

  const COLLEGE_PLACEHOLDER = "단과대학을 선택해주세요.";
  const COLLEGE_TYPES = [
    "공과대학",
    "인문대학",
    "사회과학대학",
    "자연과학대학",
  ];

  const DEPARTMENT_PLACEHOLDER = "학과를 선택해주세요.";
  const DEPARTMENT_TYPES = [
    "컴퓨터공학과",
    "전자공학과",
    "경영학과",
    "국어국문학과",
  ];

  const checkEmail = async () => {
    try {
      const res = await authInstance.get("/univ/check/email", {
        params: {
          schoolEmail: registerData.schoolEmail,
        }
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert('사용 가능한 이메일 입니다.');
    setEmailButtonLabel('메일 보내기');
  }
  const sendEmail = async () => {
    try {
      const res = await authInstance.get("/univ/send/email", {
        params: {
          schoolEmail: registerData.schoolEmail,
        }
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert('인증 번호를 보냈습니다.');
  }

  const getButtonClickHandler = () => {
    if (emailButtonLabel === '메일 중복 확인') {
      checkEmail();
    } else if (emailButtonLabel === '메일 보내기') {
      sendEmail();
      setEmailCertify(true);
    } else {
      console.log("else");
    }
  };

  const getCertificationHandler = async () => {
    try {
      const res = await authInstance.get("/univ/certificate/email", {
        params: {
          certificationNumber: certificationValue,
        }
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    alert('인증되었습니다.');
    setRegisterComplete(true);
  }


  return (
    <WrapContent>
      <HeaderPrev
        title={"학교를 인증해주세요 🏫"}
        navigateTo="/register/user"
      />

      <Dropdown
        label="학교"
        placeholder={UNIV_PLACEHOLDER}
        types={UNIV_TYPES}
        setState={setSchool}
      />

      <Dropdown
        label="단과대학"
        placeholder={COLLEGE_PLACEHOLDER}
        types={COLLEGE_TYPES}
        setState={setCollege}
      />

      <Dropdown
        label="학과"
        placeholder={DEPARTMENT_PLACEHOLDER}
        types={DEPARTMENT_TYPES}
        setState={setDepartment}
      />

      <TextInput
        label="학생메일 인증하기"
        name="schoolEmail"
        type="email"
        buttonLabel={emailButtonLabel}
        buttonDisabled={emailIsDisabled}
        // value={registerData.schoolEmail}
        onChange={handleChange}
        buttonClickHandler={getButtonClickHandler}
      />
      {emailCertify &&
        <TextInput
          label="인증번호"
          name="emailCertification"
          type="text"
          buttonLabel="인증하기"
          onChange={handleChangeCertification}
          buttonClickHandler={getCertificationHandler}
          timerState={300}
          onTimerEnd={()=>setEmailCertify(false)}
        />}

      <WrapCheckbox>
        <Checkbox
          label="(필수) 이용약관 동의"
          name="agreeTerms"
          onChange={handleChecked}
          checked={registerData.agreeTerms}
        />
        <Checkbox
          label="(필수) 개인정보 수집 및 활용 동의"
          name="agreePrivacy"
          onChange={handleChecked}
          checked={registerData.agreePrivacy}
        />
      </WrapCheckbox>

      <Button size="large" disabled={isDisabled} onClick={handleSubmit}>
        가입 완료하기
      </Button>
    </WrapContent>
  );
};

const WrapContent = styled.div`
  display: grid;
  gap: 2rem;
  padding: 2rem;
`;

const WrapCheckbox = styled.div`
  display: flex;
  flex-direction: column;
`;

export default UnivRegisterPage;
