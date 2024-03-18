import React from "react";
import Header from "../../components/common/Header";
import styled from "styled-components";

const ChatIndexPage = () => {
  return (
    <ChatContainer>
      <Header />

      <div>요청함</div>

      <ChatRoomContainer>
        <div className="left-section">
          <ImageContainer>
            <img src="/assets/home/profile-bear.png" alt="캐릭터" />
          </ImageContainer>

          <div className="profile-section">
            <Profile>경영학과, ENTJ</Profile>
            <Message>오 그러겡 ㅎㅎ 신기하당</Message>
          </div>
        </div>

        <div className="right-section">
          <Time>14:29</Time>
          <LeaveButton>나가기</LeaveButton>
        </div>
      </ChatRoomContainer>
    </ChatContainer>
  );
};

const ChatContainer = styled.div`
  padding: 2rem 1.5rem;
`;

const ChatRoomContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .left-section {
    display: flex;
    align-items: center;
    gap: 12px;

    > .profile-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }

  > .right-section {
    display: flex;
    gap: 12px;
    flex-direction: column;
    align-items: flex-end;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 72px;
  height: 72px;
  border-radius: 9999px;
  box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.66);

  > img {
    position: absolute;
    width: 70%;
    height: 70%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Profile = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
`;

const Message = styled.div`
  font-size: 0.75rem;
`;

const Time = styled.div`
  color: #898989;
  font-weight: 400;
  font-size: 0.6rem;
`;

const LeaveButton = styled.button`
  background-color: #ff6b6b;
  color: #ffffff;
  border: none;
  border-radius: 9999px;
  padding: 6px 12px;
  font-weight: 600;
`;

export default ChatIndexPage;
