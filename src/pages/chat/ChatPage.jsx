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
  const [staleMessages, setStaleMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [draftMessage, setDraftMessage] = useState("");

  useEffect(() => {
    console.log("myId", myId);
    console.log("opponentId", opponentId);
    console.log("roomId", roomId);
  }, []);

  useEffect(() => {
    console.log(messages);
  }, [messages]);

  useEffect(() => {
    const fetchStaleMessages = async () => {
      console.log("roomId");
      console.log(roomId);
      const msg = await authInstance
        .get(`/chatroom/${roomId}`)
        .then((res) => res.data);

      setStaleMessages(msg);
    };

    fetchStaleMessages();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const newClient = Stomp.client("wss://api.dis-tance.com/meet");

    const connect_callback = function (frame) {
      console.log("Connected: " + frame);
      let subscription_callback = function (message) {
        console.log("subscribe 연결됨!");
        setMessages((prevMessages) => [
          ...prevMessages,
          JSON.parse(message.body),
        ]);
      };

      newClient.subscribe(`/topic/chatroom/${roomId}`, subscription_callback);
    };

    var headers = {
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
    client.publish({
      destination: `/app/chat/${roomId}`,
      body: JSON.stringify({
        chatMessage: draftMessage,
        senderId: opponentId,
      }),
    });
    setDraftMessage("");
  };

  useEffect(() => {
    setDistance(200);
    setIsCallActive(true);
  }, []);

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
      {staleMessages.length > 0 &&
        staleMessages.map((msg, index) => (
          <div key={index}>{msg.chatMessage}</div>
        ))}
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
