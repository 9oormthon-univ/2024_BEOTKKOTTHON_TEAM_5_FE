import React, { useEffect, useRef, useState } from "react";
import Messages from "../../components/chat/Messages";
import MessageInput from "../../components/chat/MessageInput";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import { authInstance } from "../../api/instance";
import toast, { Toaster } from "react-hot-toast";

const ChatPage = () => {
  const [distance, setDistance] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const myId = location.state.myId;
  const opponentId = location.state.opponentId;
  const roomId = location.state.roomId;

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");

  const viewportRef = useRef();

  const [opponentTelNum, setOpponentTelNum] = useState("");

  useEffect(() => {
    const fetchDistance = async () => {
      const distance = await authInstance
        .get(`/gps/distance?id1=${myId}&id2=${opponentId}`)
        .then((res) => res.data);

      const parseDistance = parseInt(distance);
      setDistance(parseDistance);
    };
    fetchDistance();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newClient = Stomp.client("wss://api.dis-tance.com/meet");

    const fetchMessages = () => {
      const staleMessages = localStorage.getItem("staleMessages");
      console.log("staleMessages", staleMessages);
      if (staleMessages) {
        const parsedStaleMessages = JSON.parse(staleMessages);
        if (parsedStaleMessages[roomId]) {
          setMessages(JSON.parse(parsedStaleMessages[roomId]));
        }
      }
    };

    fetchMessages();

    const fetchUnreadMessages = async () => {
      const msg = await authInstance
        .get(`/chatroom/${roomId}`)
        .then((res) => res.data);

      if (msg.length === 0) return;
      setMessages((messages) => [...messages, ...msg]);
    };
    fetchUnreadMessages();

    const connect_callback = function (frame) {
      let subscription_callback = function (message) {
        const parsedMessage = JSON.parse(message.body);
        setMessages((prevMessages) => {
          let lastIndexChange = -1;
          const oldMessages = [...prevMessages];
          for (let i = oldMessages.length - 2; i >= 0; i--) {
            if (oldMessages[i].senderId !== oldMessages[i + 1].senderId) {
              lastIndexChange = i;
              break;
            }
          }
          if (lastIndexChange !== -1) {
            for (let i = 0; i <= lastIndexChange; i++) {
              oldMessages[i].unreadCount = 0;
            }
          }
          return [...oldMessages, parsedMessage.body];
        });
      };

      newClient.subscribe(`/topic/chatroom/${roomId}`, subscription_callback);
    };

    let headers = {
      Authorization: `Bearer ${token}`,
      chatRoomId: roomId,
      memberId: myId,
    };

    newClient.connect(headers, connect_callback);
    newClient.activate();
    setClient(newClient);

    return () => {
      newClient.deactivate();
    };
  }, []);

  useEffect(() => {
    if (messages.length > 10) {
      setIsCallActive(true);
    }
  }, [messages]);

  const fetchOpponentTelNum = async () => {
    if (opponentTelNum !== "") return;
    const telNum = await authInstance
      .get(`/member/tel-num/${opponentId}`)
      .then((res) => res.data.telNum);
    setOpponentTelNum(telNum);
  };

  const handleChange = (e) => {
    setDraftMessage(e.target.value);
  };

  const handleLeaveRoom = async (e) => {
    e.preventDefault();
    const res = window.confirm("정말로 나가시겠습니까?");
    if (!res) return;

    client.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify({
        chatMessage: "[알림]상대방이 나갔습니다.",
        senderId: opponentId,
        receiverId: myId,
      }),
    });

    await authInstance.get(`/room-member/leave/${roomId}`).then(() => {
      const localStorageChat = JSON.parse(
        localStorage.getItem("staleMessages")
      );
      delete localStorageChat[roomId];
      localStorage.setItem("staleMessages", JSON.stringify(localStorageChat));

      navigate(-1);
    });
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    // 메시지가 비어있으면 전송하지 않음
    if (!draftMessage) return;

    // 욕 있는지 검사
    const isIncludingBadWord = await authInstance
      .post("/chatroom/check/badword", {
        chatMessage: draftMessage,
        senderId: opponentId,
        receiverId: myId,
      })
      .then((res) => res.data);

    if (isIncludingBadWord) {
      toast.error("앗! 부적절한 단어가 포함되어 있어요.");
      setDraftMessage("");
      return;
    }

    client.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify({
        chatMessage: draftMessage,
        senderId: opponentId,
        receiverId: myId,
      }),
    });
    setDraftMessage("");
  };

  useEffect(() => {
    if (isCallActive) {
      fetchOpponentTelNum();
    }
  }, [isCallActive]);

  useEffect(() => {
    console.log(messages);
    const saveMessages = () => {
      const staleMessages =
        JSON.parse(localStorage.getItem("staleMessages")) || {};
      staleMessages[roomId] = JSON.stringify(messages); // Save the current state of messages for this room
      localStorage.setItem("staleMessages", JSON.stringify(staleMessages));
    };

    if (messages.length > 0) {
      saveMessages();
    }
  }, [messages]);

  return (
    <Wrapper
      onScroll={() => {
        // 스크롤을 항상 최하단으로 내려주는 로직
        if (viewportRef.current) {
          const { scrollHeight, clientHeight, scrollTop } = viewportRef.current;
          if (scrollHeight - clientHeight === scrollTop) {
            viewportRef.current.scrollTop = scrollHeight;
          }
        }
      }}>
      <Toaster position="bottom-center" />
      <Container ref={viewportRef}>
        <TopBar>
          <BackButton
            onClick={() => {
              navigate(-1);
            }}>
            <img
              src="/assets/arrow-pink-button.png"
              alt="뒤로가기"
              width={12}
            />
          </BackButton>
          <WrapTitle>
            <div className="title">상대방과의 거리</div>
            <div className="subtitle">{distance}m</div>
          </WrapTitle>
          <div>
            <CallButton>
              {isCallActive ? (
                <a href={`tel:${opponentTelNum}`}>
                  <img src="/assets/callicon-active.png" alt="전화버튼" />
                </a>
              ) : (
                <img src="/assets/callicon.png" alt="전화버튼" />
              )}
            </CallButton>
            <LeaveButton onClick={handleLeaveRoom}>
              <img src="/assets/leave-button.png" alt="나가기 버튼" />
            </LeaveButton>
          </div>
          {/* 나가기 버튼 먼저 놓고 */}
          {/* 나가기 로직 구현 */}
        </TopBar>

        <Messages messages={messages} myId={myId} />
        <MessageInput
          value={draftMessage}
          changeHandler={handleChange}
          submitHandler={sendMessage}
        />
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  touch-action: none;
  overflow: hidden;
`;

const Container = styled.div`
  height: 100vh;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: height 0.3s;
`;

const BackButton = styled.button`
  background: none;
  border: none;
`;

const CallButton = styled.button`
  background: none;
  border: none;
`;

const LeaveButton = styled.button`
  background: none;
  border: none;
`;

const WrapTitle = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;

  > .title {
    font-size: 1rem;
  }

  > .subtitle {
    font-size: 0.8rem;
    color: #979797;
  }
`;

const TopBar = styled.div`
  position: relative;
  background: #ffffff;
  padding: 0.75rem 1rem;
  height: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export default ChatPage;
