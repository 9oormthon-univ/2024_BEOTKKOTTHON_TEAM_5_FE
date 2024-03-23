import React, { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";
import { useEffect } from "react";
import { authInstance } from "../../api/instance";
import ClipLoader from "react-spinners/ClipLoader";
import Characters from "../../constants/character";

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

    .version {
      color: #B9B9B9;
    }
  }
  .border {
    border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  }
`;


const WarpProfile = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 130px;
  border-radius: 1rem;
  box-shadow: 0px 5px 20px 0px #00000014;
  margin-bottom: 2rem;
  padding: 0 1rem;

  img {
    width: 35%;
  }
`;

const TextDiv = styled.div`
  width: 100%;
  align-items: center;


  .title {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
  .tag {
    display: flex;
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 1rem;
    color: #333333;
    white-space: nowrap;
  }
`;
const WrapTag = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;


const MyIndexPage = () => {


  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();
  const [myData, setMyData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await authInstance.get(`/member/profile/${memberId}`);
        setMyData(response.data);
      } catch (error) {
        console.error('There was an error!', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('clientToken');
    localStorage.removeItem('memberId');
    navigate("/");
  }

  return (
    <MyPageContainer>
      <Header />
      {loading ? (
        <LoaderContainer>
          <ClipLoader color={"#FF625D"} loading={loading} size={50} />
        </LoaderContainer>) :
        (
          <>
            <WrapMenu>
              <div className="title">마이페이지</div>
              <WarpProfile>
                <img src={Characters[myData.memberCharacter]} alt="festival" />
                <TextDiv>
                  <div className="title">{myData.department}, {myData.mbti}</div>
                  <WrapTag>
                    {myData.memberHobbyDto && myData.memberHobbyDto.map((hobby, index) =>
                      <div key={index} className="tag"># {hobby.hobby}</div>
                    )}
                  </WrapTag>
                  <WrapTag>
                    {myData.memberTagDto && myData.memberTagDto.map((tag, index) =>
                      <div key={index} className="tag"># {tag.tag}</div>
                    )}
                  </WrapTag>
                </TextDiv>
              </WarpProfile>
              <WrapButton>
                <div
                  className="menu"
                  onClick={() => navigate("/mypage/profile", { state: myData })}>
                  <div>프로필 수정</div>
                  <img src="/assets/mypage/arrow-gray-button.png" alt="Edit Profile" />
                </div>
                <div className="menu">
                  <div>버전</div>
                  <div className="version">1.0.0</div>
                </div>
                <div className="menu" onClick={handleLogout}>
                  <div>로그아웃</div>
                </div>
              </WrapButton>
            </WrapMenu>
          </>)}
    </MyPageContainer>
  );
};

export default MyIndexPage;
