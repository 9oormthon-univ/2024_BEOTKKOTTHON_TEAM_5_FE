import React from "react";
import styled from "styled-components";
import Header from "../../components/common/Header";

const ChatInboxPage = () => {
  // const [inboxList, setInboxList] = useState([]);

  // const fetchInboxList = async () => {
  // const res = await authInstance
  //   .get("/chatroom")
  //   .then((res) => res.data)
  //   .then((data) => {
  //     const tempResponse = [...data];
  //     tempResponse.sort(
  //       (a, b) => new Date(b.modifyDt) - new Date(a.modifyDt)
  //     );
  //     return tempResponse;
  //   });
  // setInboxList(res);
  //
  // const res = await authInstance.get("/대기열").then((res) => res.data);
  // setInboxList(res);
  // };

  const handleAcceptChat = async (chatId) => {
    // 채팅 수락 API 호출
    console.log("채팅 수락 API 호출");
  };

  // useEffect(() => {
  //   fetchInboxList();
  // }, []);

  return (
    <PagePadding>
      <Header />
      {/* map()으로 inboxList를 순회하며 ChatRoomContainer를 렌더링합니다. */}
      <Spacer>
        <Title>요청함</Title>
        <InboxContainer>
          <ImageContainer>
            <img src="/assets/home/profile-bear.png" alt="캐릭터" />
          </ImageContainer>

          <div className="right-section">
            <div className="upper-area">
              <Profile>수학과, ISTJ</Profile>
              <LeaveButton
                onClick={() => {
                  const isAccepted = window.confirm("대화를 수락하시겠습니까?");
                  if (isAccepted) {
                    handleAcceptChat(); // 인자로 chatId 넘겨주기
                  }
                }}>
                수락하기
              </LeaveButton>
            </div>
            <Message>'수락하기'를 누르면 대화를 시작할 수 있어요!</Message>
          </div>
        </InboxContainer>
      </Spacer>
    </PagePadding>
  );
};

export default ChatInboxPage;

const PagePadding = styled.div`
  padding: 2rem 1.5rem;
`;

const InboxContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  > .right-section {
    display: grid;
    flex: 1;
    gap: 0.5rem;

    > .upper-area {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const Spacer = styled.div`
  display: grid;
  gap: 1rem;
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
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
