import React from "react";
import styled from 'styled-components';
import Header from "../../components/common/Header";

const MyPageContainer = styled.section`
  padding: 2rem 1.5rem;
`;
const WrapMenu = styled.nav`
  padding: 1.5rem 0;

  .title{
    font-weight: 700;
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;
const WrapButton = styled.div`

  .menu {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1rem;
    padding: 0.8rem 0;

    img {
      height: 1rem;
    }
  }
  .border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
`;

const MyIndexPage = () => {
  
  return (
    <MyPageContainer>
      <Header />
      <WrapMenu>
        <div className="title">마이페이지</div>
        <WrapButton>
          <div className="menu">
            <div>프로필 수정</div>
            <img src="/assets/mypage/arrow-gray-button.png" />
          </div>
          <div className="menu border">
            <div>계정 관리</div>
            <img src="/assets/mypage/arrow-gray-button.png" />
          </div>
          <div className="menu">피드백</div>
          <div className="menu">이용약관</div>
          <div className="menu">버전</div>
        </WrapButton>
      </WrapMenu>
    </MyPageContainer>
  );
};

export default MyIndexPage;
