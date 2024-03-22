import React, { useEffect, useRef, useState } from "react";
import Messages from "../../components/chat/Messages";
import MessageInput from "../../components/chat/MessageInput";
import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import { authInstance } from "../../api/instance";

const ChatPage = () => {
  const [distance, setDistance] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

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
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.indexOf("iphone") !== -1) {
      setIsIos(true);
    }
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

  useEffect(() => {
    console.log("messages.length");
    console.log(messages.length);
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

  const sendMessage = (e) => {
    e.preventDefault();
    if (!draftMessage) return;
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
    setDistance(200);
  }, []);

  useEffect(() => {
    if (isCallActive) {
      fetchOpponentTelNum();
    }
  }, [isCallActive]);

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
      <Container keyboardHeight={keyboardHeight} ref={viewportRef}>
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
          <CallButton>
            {isCallActive ? (
              <a href={`tel:${opponentTelNum}`}>
                <img
                  src="/assets/Callicon-active.svg"
                  onClick={() => {}}
                  alt="전화버튼"
                />
              </a>
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
          focusHandler={() => {
            if (isIos) setKeyboardHeight(330);
          }}
          blurHandler={() => {
            if (isIos) setKeyboardHeight(0);
          }}
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
  height: ${(props) => `calc(100dvh - ${props.keyboardHeight}px)`};
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: height 0.3s;
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
