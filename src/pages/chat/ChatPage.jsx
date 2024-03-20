import React, { useEffect, useState } from "react";
import Messages from "../../components/chat/Messages";
import MessageInput from "../../components/chat/MessageInput";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import { authInstance } from "../../api/instance";

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

  useEffect(() => {
    const token = localStorage.getItem("token");
    const newClient = Stomp.client("wss://api.dis-tance.com/meet");

    const fetchMessages = () => {
      const staleMessages = localStorage.getItem("staleMessages");
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
      setMessages([...messages, msg]);
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

  const handleChange = (e) => {
    setDraftMessage(e.target.value);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!draftMessage) return;
    client.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify({
        chatMessage: draftMessage,
        senderId: opponentId,
      }),
    });
    setDraftMessage("");
  };

  // ㅅ
  useEffect(() => {
    setDistance(200);
    setIsCallActive(true);
  }, []);

  useEffect(() => {
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
    <Container>
      <TopBar>
        <BackButton
          onClick={() => {
            navigate(-1);
          }}>
          <img src="/assets/arrow-pink-button.png" alt="뒤로가기" width={12} />
        </BackButton>
        <WrapTitle>
          <div className="title">상대방과의 거리</div>
          <div className="subtitle">{distance}m</div>
        </WrapTitle>
        <CallButton>
          {isCallActive ? (
            <img src="/assets/Callicon-active.svg" alt="전화버튼" />
          ) : (
            <img src="/assets/Callicon.svg" alt="전화버튼" />
          )}
        </CallButton>
      </TopBar>

      <Messages messages={messages} myId={myId} />
      <MessageInput
        value={draftMessage}
        changeHandler={handleChange}
        submitHandler={sendMessage}
      />
    </Container>
  );
};

const Container = styled.div`
  height: 100dvh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BackButton = styled.div`
  position: absolute;
  left: 1rem;
`;

const CallButton = styled.div`
  position: absolute;
  right: 1rem;
`;

const WrapTitle = styled.div`
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
  justify-content: center;
  align-items: center;
`;

export default ChatPage;
