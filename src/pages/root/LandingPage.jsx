import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import styled from "styled-components";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>디폴트</title>
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dis-tance.com/" />
        <meta property="og:title" content="Distance" />
        <meta property="og:description" content="축제를 200% 즐기는 방법5" />
        <meta
          property="og:image"
          content="https://www.urbanbrush.net/web/wp-content/uploads/edd/2023/02/urban-20230228092421948485.jpg"
        />
      </Helmet>

      <Background>
        <WrapContent>
          <img src="/assets/logo.svg" alt="디스턴스 로고" />
          <WrapButton>
            <LongButton
              onClick={() => {
                navigate("/register/user");
              }}>
              학생 메일로 가입하기
            </LongButton>
            <StyledLink to="/login">로그인</StyledLink>
          </WrapButton>
        </WrapContent>
      </Background>
    </>

  );
};

const Background = styled.div`
  width: 100dvw;
  height: 100dvh;
  background-color: #ff625d;
`;

const WrapContent = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const WrapButton = styled.div`
  display: grid;
  gap: 1rem;
  text-align: center;
  position: absolute;
  bottom: 2rem;
`;

const LongButton = styled.div`
  background-color: #ffac0b;
  font-weight: 600;
  color: #333333;
  border: none;
  padding: 1.5rem 6.5rem;
  border-radius: 1rem;
`;

const StyledLink = styled(Link)`
  color: #ffffff;
`;

export default LandingPage;
