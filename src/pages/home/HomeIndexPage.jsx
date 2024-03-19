import React from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { authInstance } from "../../api/instance";

import Header from "../../components/common/Header";
import Profile from "../../components/home/Profile";
import Modal from "../../components/common/Modal";
import { useNavigate } from "react-router-dom";

const profiles = [
  {
    id: 0,
    character: "/assets/home/profile-dog.png",
    major: "산업경영공학과",
    mbti: "ENTJ",
    tags: ["활발한", "계획적인", "유머러스한", "운동", "클라이밍"],
  },
  {
    id: 1,
    character: "/assets/home/profile-cat.png",
    major: "국어국문학과",
    mbti: "INFP",
    tags: ["신중한", "감성적", "배려심", "OTT", "자기계발"],
  },
  {
    id: 3,
    character: "/assets/home/profile-fox.png",
    major: "전자공학과",
    mbti: "ISTP",
    tags: ["안정적", "독립심", "솔직한", "러닝", "농구"],
  },
  {
    id: 4,
    character: "/assets/home/profile-bear.png",
    major: "사학과",
    mbti: "ESFJ",
    tags: ["적극적", "밝음", "친화력", "맛집", "음악"],
  },
];

const HomeIndexPage = () => {
  const profileModal = useRef();
  const [selectedProfile, setSelectedProfile] = useState();
  const navigate = useNavigate();

  const content = () => {
    return (
      selectedProfile && (
        <WrapContent>
          <CharacterDiv>
            <StyledImage src={selectedProfile.character} />
          </CharacterDiv>
          <TextDiv>
            <div className="text-major">{selectedProfile.major}</div>
            <div className="text-mbti">{selectedProfile.mbti}</div>
            <div className="text-tags">
              {selectedProfile.tags.map((tag, index) => {
                return <span key={index}>#{tag} </span>;
              })}
            </div>
          </TextDiv>
        </WrapContent>
      )
    );
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    profileModal.current.open();
  };

  const handleCreateChatRoom = async () => {
    try {
      await authInstance.post("/chatroom/create", {
        memberId:3,
        roomName:"roomName1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        ref={profileModal}
        content={content()}
        buttonLabel="메세지 보내기"
        onCreateRoom={handleCreateChatRoom}
      />
      <HomeContainer>
        <Header />
        <ProfileContainer>
          <button
            style={{ height: "100px" }}
            onClick={() => {
              navigate("/chat/11", { state: { memId: 2 } });
            }}>
            준석
          </button>
          <button
            style={{ height: "100px" }}
            onClick={() => {
              navigate("/chat/11", { state: { memId: 4 } });
            }}>
            주영
          </button>

          {profiles.map((profile, index) => (
            <Profile
              key={index}
              side={index % 2 === 0 ? "left" : "right"}
              profile={profile}
              onClick={() => handleSelectProfile(profile)}
            />
          ))}
        </ProfileContainer>
        <ReloadButton src="/assets/home/reload-button.png" alt="Reload button" />
      </HomeContainer>
    </>
  );
};

const HomeContainer = styled.section`
  padding: 2rem 1.5rem;
`;

const ProfileContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

const ReloadButton = styled.img`
  position: fixed;
  right: 1.5rem;
  bottom: 4.5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 8px 0px #33333366;
`;

const WrapContent = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const CharacterDiv = styled.div`
  width: 50%;
  display: flex;
  margin: 0 auto;
  padding-bottom: 1rem;
`;

const StyledImage = styled.img`
  width: 100%;
`;

const TextDiv = styled.div`
  width: 100%;
  text-align: center;
  color: #333333;

  .text-major {
    font-size: 2rem;
    font-weight: 800;
    white-space: nowrap;
  }
  .text-mbti {
    font-size: 1.2rem;
    font-weight: 400;
  }
  .text-tags {
    width: 90%;
    font-size: 1rem;
    font-weight: 400;
    margin: 1.5rem auto;
  }
`;

export default HomeIndexPage;
