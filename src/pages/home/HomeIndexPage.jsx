import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useState } from "react";
import { authInstance } from "../../api/instance";

import Header from "../../components/common/Header";
import Profile from "../../components/home/Profile";
import Modal from "../../components/common/Modal";
import { useNavigate } from "react-router-dom";

const HomeIndexPage = () => {
  const [chatroomCreate, setChatroomCreate] = useState({
    memberId: "",
    roomName: "",
  });

  const [chatroomIdToEnter, setChatroomIdToEnter] = useState({
    myId: "",
    opponentId: "",
    chatRoomId: "",
  });

  const profileModal = useRef();
  const [selectedProfile, setSelectedProfile] = useState();
  const navigate = useNavigate();

  const memberId = localStorage.getItem('memberId');
  const [memberState, setMemberState] = useState([]);

  const content = () => {
    return (
      selectedProfile && (
        <WrapContent>
          <CharacterDiv>
            <StyledImage src={selectedProfile.memberCharacter} />
          </CharacterDiv>
          <TextDiv>
            <div className="text-major">{selectedProfile.department}</div>
            <div className="text-mbti">{selectedProfile.mbti}</div>
            {/* <div className="text-tags">
              {selectedProfile.tags.map((tag, index) => {
                return <span key={index}>#{tag} </span>;
              })}
            </div> */}
          </TextDiv>
        </WrapContent>
      )
    );
  };

  const handleChangeChatroom = (e) => {
    setChatroomCreate({
      ...chatroomCreate,
      [e.target.name]: e.target.value,
    });
  };

  const handleChangeChatroomId = (e) => {
    setChatroomIdToEnter({
      ...chatroomIdToEnter,
      [e.target.name]: e.target.value,
    });
  };

  const chatroomDisabled = chatroomCreate.memberId === "";

  const chatroomIdDisabled =
    chatroomIdToEnter.myId === "" ||
    chatroomIdToEnter.opponentId === "" ||
    chatroomIdToEnter.chatRoomId === "";

  useEffect(() => {
    console.log(memberState);
  }, [memberState]);

  const fetchGetMembers = async () => {
    try {
      const response = await authInstance.get(`/gps/matching/${memberId}`);
      const matchedUsers = response.data.matchedUsers;
      setMemberState(matchedUsers);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchGetMembers();
  }, []);

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    profileModal.current.open();
  };

  const handleCreateChatRoom = async () => {
    try {
      await authInstance.post("/chatroom/create", {
        memberId: 3,
        roomName: "roomName1",
      });
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * TEMP AREA
   */
  const createChatroom = async () => {
    await authInstance
      .post("/chatroom/create", {
        memberId: chatroomCreate.memberId,
      })
      .then((res) => alert(`${res.data}번 방이 성공적으로 생성되었습니다!`))
      .catch((error) => console.log(error));
  };

  const navigateChatroom = () => {
    navigate(`/chat/${chatroomIdToEnter.chatRoomId}`, {
      state: {
        myId: chatroomIdToEnter.myId,
        opponentId: chatroomIdToEnter.opponentId,
        roomId: chatroomIdToEnter.chatRoomId,
      },
    });
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
        <div>
          <div style={{ fontWeight: "900" }}>/api/chatroom/create</div>
          <label htmlFor="memberId">memberId</label>
          <input
            style={{ width: "40px" }}
            id="memberId"
            name="memberId"
            onChange={handleChangeChatroom}
            type="number"
          />
          <label htmlFor="roomName">roomName</label>
          <input
            style={{ width: "40px" }}
            id="roomName"
            name="roomName"
            onChange={handleChangeChatroom}
            type="text"
          />
          <button onClick={createChatroom} disabled={chatroomDisabled}>
            채팅방 생성
          </button>
        </div>

        <br />

        <div style={{ fontWeight: "900" }}>채팅방 입장하기</div>
        <label htmlFor="myId">내ID</label>
        <input
          style={{ width: "40px" }}
          id="myId"
          name="myId"
          onChange={handleChangeChatroomId}
          type="number"
        />
        <label htmlFor="roomName">상대ID</label>
        <input
          style={{ width: "40px" }}
          id="opponentId"
          name="opponentId"
          onChange={handleChangeChatroomId}
          type="number"
        />
        <label htmlFor="chatRoomId">chatRoomId</label>
        <input
          style={{ width: "40px" }}
          id="chatRoomId"
          name="chatRoomId"
          onChange={handleChangeChatroomId}
          type="number"
        />
        <button onClick={navigateChatroom} disabled={chatroomIdDisabled}>
          {chatroomIdToEnter.chatRoomId && chatroomIdToEnter.chatRoomId + "번"}{" "}
          채팅방 입장
        </button>

        <br />

        <ProfileContainer>
          {memberState.map((profile, index) => (
            <Profile
              key={index}
              side={index % 2 === 0 ? "left" : "right"}
              profile={memberState[index]}
              onClick={() => handleSelectProfile(memberState[index])}
            />
          ))}
        </ProfileContainer>
        <ReloadButton
          src="/assets/home/reload-button.png"
          alt="Reload button"
          onClick={fetchGetMembers}
        />
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
