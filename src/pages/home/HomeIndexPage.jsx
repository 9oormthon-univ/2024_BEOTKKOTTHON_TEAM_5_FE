import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { authInstance } from "../../api/instance";

import Characters from "../../constants/character";
import Header from "../../components/common/Header";
import Profile from "../../components/home/Profile";
import Modal from "../../components/common/Modal";
import { useNavigate } from "react-router-dom";

const HomeIndexPage = () => {
  
  const profileModal = useRef();
  const [selectedProfile, setSelectedProfile] = useState();
  const navigate = useNavigate();

  const memberId = localStorage.getItem("memberId");
  const [memberState, setMemberState] = useState([]);

  const [isReloadButtonDisabled, setIsReloadButtonDisabled] = useState(false);
  const [remainingTimeToReload, setRemainingTimeToReload] = useState(0);

  const content = () => {
    return (
      selectedProfile && (
        <WrapContent>
          <CharacterDiv>
            <StyledImage
              src={Characters[selectedProfile.memberInfoDto.memberCharacter]}
              alt={Characters[selectedProfile.memberInfoDto.memberCharacter]}
            />
          </CharacterDiv>
          <TextDiv>
            <div className="text-major">{selectedProfile.department}</div>
            <div className="text-mbti">
              {selectedProfile.memberInfoDto.mbti}
            </div>
            <div className="text-tags">
              {selectedProfile.memberInfoDto.memberHobbyDto.map(
                (tag, index) => (
                  <div key={index}>#{tag.hobby} </div>
                )
              )}
              {selectedProfile.memberInfoDto.memberTagDto.map((tag, index) => (
                <div key={index}>#{tag.tag} </div>
              ))}
            </div>
          </TextDiv>
        </WrapContent>
      )
    );
  };

  const fetchGetMembers = async () => {
    try {
      const res = await authInstance.get("/gps/matching");
      setMemberState(res.data.matchedUsers);
    } catch (error) {
      console.log(error);
    }
  };

  const reloadMembers = async () => {
    try {
      setIsReloadButtonDisabled(true); // 버튼 비활성화
      setRemainingTimeToReload(3); // 초기 남은 시간 설정

      const res = await authInstance.get("/gps/matching");
      setMemberState(res.data.matchedUsers);

      // 매초마다 남은 시간 업데이트
      const intervalId = setInterval(() => {
        setRemainingTimeToReload((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId); // 남은 시간이 0이 되면 인터벌 정지
            setIsReloadButtonDisabled(false); // 버튼 활성화
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } catch (error) {
      console.log(error);
      setIsReloadButtonDisabled(false); // 에러 발생 시 버튼 활성화
    }
  };

  useEffect(() => {
    fetchGetMembers();
  }, []);

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    profileModal.current.open();
  };

  const handleCreateChatRoom = async (opponentMemberId) => {
    // 방이 성공적으로 생성된 경우
    // 이미 이사람과 생성된 방이 있는 경우
    // 내가 이미 3개의 방을 갖고 있는 경우
    // 상대방이 3개의 방을 갖고 있는 경우
    // 이외 에러 발생 시
    await authInstance
      .post("/chatroom/create", {
        memberId: opponentMemberId,
      })
      .then((res) => {
        const createdChatRoom = res.data;
        navigate(`/chat/${createdChatRoom}`, {
          state: {
            myId: memberId,
            opponentId: opponentMemberId,
            roomId: createdChatRoom,
          },
        });
      })
      .catch((error) => {
        switch (error.response.data.code) {
          case "TOO_MANY_MY_CHATROOM":
            alert(
              "이미 생성된 채팅방 3개입니다. 기존 채팅방을 지우고 다시 시도해주세요."
            );
            break;
          case "TOO_MANY_OPPONENT_CHATROOM":
            alert(
              "상대방이 이미 생성된 채팅방 3개입니다. 상대방이 수락하면 알려드릴게요!"
            );
            break;
          default:
            alert("채팅방 생성에 실패했습니다. 다시 시도해주세요.");
            break;
        }
      });
    profileModal.current.close();
  };

  return (
    <>
      <Modal
        ref={profileModal}
        content={content()}
        buttonLabel="메세지 보내기"
        onCreateRoom={() => {
          handleCreateChatRoom(selectedProfile.memberId);
        }}
      />
      <HomeContainer>
        <Header />
        <ProfileContainer>
          {memberState.map((profile, index) => (
            <Profile
              key={index}
              id={profile.memberId}
              side={index % 2 === 0 ? "left" : "right"}
              profile={profile}
              onClick={() => handleSelectProfile(profile)}
            />
          ))}
        </ProfileContainer>
        <ReloadButton onClick={reloadMembers} disabled={isReloadButtonDisabled}>
          {isReloadButtonDisabled && (
            <div className="time-remaining">{remainingTimeToReload}</div>
          )}
          <img src="/assets/home/reload-button.png" alt="Reload button" />
        </ReloadButton>
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

const ReloadButton = styled.button`
  position: fixed;
  right: 1.5rem;
  bottom: 5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #ffffff;
  box-shadow: 0px 2px 8px 0px #33333366;

  > .time-remaining {
    position: absolute;
    z-index: 9999;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 0.8rem;
    font-weight: 700;
    color: #000000;
  }

  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &:disabled {
    filter: brightness(0.4);
  }
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
    font-size: 1.4rem;
    font-weight: 700;
    white-space: nowrap;
  }
  .text-mbti {
    font-size: 1.2rem;
    font-weight: 400;
  }
  .text-tags {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.2rem;
    font-size: 1rem;
    font-weight: 400;
    margin: 1.5rem auto;
  }
`;

export default HomeIndexPage;
