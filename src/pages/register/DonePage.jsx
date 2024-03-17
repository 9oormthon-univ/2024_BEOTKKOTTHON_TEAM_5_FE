import React from "react";
import styled from "styled-components";
import Button from "../../components/common/Button";
import { useNavigate } from "react-router-dom";

const DonePage = () => {
  const navigate = useNavigate();

  return (
    <Background>
      <WrapContent>
        <WrapMessage>
          <div style={{ fontSize: "60px" }}>🎊</div>
          <h2>가입이 완료되었습니다!</h2>
        </WrapMessage>
        <WrapButton>
          <Button
            size="large"
            onClick={() => {
              navigate("/register/profile");
            }}>
            프로필 설정하기
          </Button>
        </WrapButton>
      </WrapContent>
    </Background>
  );
};

const Background = styled.div`
  width: 100dvw;
  height: 100dvh;
`;

const WrapContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WrapMessage = styled.div`
  text-align: center;
`;

const WrapButton = styled.div`
  position: absolute;
  bottom: 2rem;
`;

export default DonePage;
