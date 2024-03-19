import React from "react";
import styled from "styled-components";

const ChatInboxPage = () => {
  return (
    <InboxContainer>
      ChatInboxPage
      <ChatRoomContainer>
        <div className="left-section">
          <ImageContainer>
            {/* characer에 따라 src 변경 */}
            <img src="/assets/home/profile-bear.png" alt="캐릭터" />
          </ImageContainer>

          <div
            className="profile-section"
            style={{ flexGrow: 1, backgroundColor: "yellow" }}>
            <div
              style={{
                display: "flex",

                justifyContent: "space-between",
              }}>
              <Profile>수학과, ISTJ</Profile>
              <LeaveButton>수락하기</LeaveButton>
            </div>
            <Message>'수락하기'를 누르면 대화를 시작할 수 있어요!</Message>
          </div>
        </div>

        {/* <div className="right-section"></div> */}
      </ChatRoomContainer>
    </InboxContainer>
  );
};

export default ChatInboxPage;

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
const InboxContainer = styled.div`
  padding: 2rem 1.5rem;
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
  color: #ff625d;
  font-size: 0.75rem;
`;

const LeaveButton = styled.button`
  background-color: #ffac0b;
  border: none;
  border-radius: 9999px;
  padding: 6px 12px;
  font-weight: 600;
  font-size: 8px;
`;
