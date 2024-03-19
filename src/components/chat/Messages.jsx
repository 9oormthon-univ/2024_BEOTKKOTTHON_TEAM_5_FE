import React, { useEffect, useRef } from "react";
import Message from "./Message";
import styled from "styled-components";

const Messages = ({ messages, myId }) => {
  const messageRef = useRef();

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
      {messages &&
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              nickname={message.body.senderId}
              content={message.body.chatMessage}
              time={message.body.sendDt}
              read={!!message.body.unreadCount}
              sentByMe={message.body.senderId === myId}
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
