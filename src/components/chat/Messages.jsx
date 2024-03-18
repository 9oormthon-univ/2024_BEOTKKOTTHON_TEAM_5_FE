import React, { useEffect, useRef } from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = () => {
  const messageRef = useRef();

  const NICKNAME = "경영학과 ENTJ";
  const TIME = "09:50";
  const messages = [
    {
      content: "안녕~ 소프트웨어과?",
      read: false,
    },
    {
      content: "나 친구들이랑 술먹는중!",
      read: false,
    },
    {
      content: "여기 잔디밭 근처에서 돗자리펴고 먹구있엉 ㅎㅎ",
      read: false,
    },
    {
      content: "너 내 200미터 근처에 있대",
      read: false,
    },
    {
      content: "ㅋㅋㅋㅋㅋㅋ",
      read: false,
    },
    {
      content: "안녕~ 소프트웨어과?",
      read: false,
    },
    {
      content: "나 친구들이랑 술먹는중!",
      read: false,
    },
    {
      content: "여기 잔디밭 근처에서 돗자리펴고 먹구있엉 ㅎㅎ",
      read: false,
    },
    {
      content: "너 내 200미터 근처에 있대",
      read: false,
    },
    {
      content: "ㅋㅋㅋㅋㅋㅋ",
      read: false,
    },
    {
      content: "안녕~ 소프트웨어과?",
      read: false,
    },
    {
      content: "나 친구들이랑 술먹는중!",
      read: false,
    },
    {
      content: "여기 잔디밭 근처에서 돗자리펴고 먹구있엉 ㅎㅎ",
      read: false,
    },
    {
      content: "너 내 200미터 근처에 있대",
      read: false,
    },
    {
      content: "ㅋㅋㅋㅋㅋㅋ",
      read: false,
    },
  ];

  const scrollToBottom = () => {
    if (messageRef.current) {
      messageRef.current.scrollTop = messageRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <MessagesWrapper ref={messageRef}>
      <Announcement>
        <div className="content">
          📢 잠깐만요! 채팅 상대는 소중한 학우입니다. 사이버 예절을 지켜 주세요.
        </div>
      </Announcement>
      {messages.map((messages, index) => {
        return (
          <Message
            key={index}
            nickname={NICKNAME}
            content={messages.content}
            time={TIME}
            read={messages.read}
          />
        );
      })}
    </MessagesWrapper>
  );
};

const MessagesWrapper = styled.div`
  overflow: auto;
  flex: 1;
  min-height: 0;
`;

const Announcement = styled.div`
  display: flex;
  justify-content: center;
  margin: 16px;

  > .content {
    font-size: 0.7rem;
    background-color: #eee;
    padding: 0.5rem;
    text-align: center;
    border-radius: 9999px;
  }
`;

export default Messages;
