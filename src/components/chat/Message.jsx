import React from "react";
import styled from "styled-components";

/**
 * @param {string} nickname - 메시지를 보낸 사람의 닉네임
 * @param {string} content - 메시지 내용
 * @param {string} time - 메시지를 보낸 시간
 * @param {boolean} read - 메시지를 읽었는지 여부
 * @param {boolean} sentByMe - 메시지를 내가 보냈는지 여부
 */
const Message = ({ nickname, content, time, read, sentByMe }) => {
  return (
    <>
      {sentByMe ? (
        <MessageByMe>
          <div className="message-container">
            <div className="wrapper">
              <div className="read">{!read && "1"}</div>
              <div className="time">{time}</div>
            </div>
            <div className="tail"></div>
            <div className="message">{content}</div>
          </div>
        </MessageByMe>
      ) : (
        <MessageByOther>
          <div className="nickname">{nickname}</div>
          <div className="message-container">
            <div className="tail"></div>
            <div className="message">{content}</div>
            <div className="wrapper">
              <div className="read">{!read && "1"}</div>
              <div className="time">{time}</div>
            </div>
          </div>
        </MessageByOther>
      )}
    </>
  );
};

const MessageByOther = styled.div`
  margin: 16px;

  > .nickname {
    margin-bottom: 4px;
    font-size: 0.8rem;
    opacity: 50%;
  }

  > .message-container {
    display: flex;
    align-items: end;
    gap: 0.5rem;
    position: relative;
    flex-grow: 1;

    > .tail {
      position: absolute;
      top: 0;
      left: -10px;
      width: 30px;
      height: 30px;
      clip-path: polygon(100% 0, 0 0, 100% 100%);
      background-color: #f5f5f5;
      z-index: -1;
    }

    > .message {
      width: fit-content;
      max-width: 70%;
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 1rem;
      color: black;
      line-height: 1.5;
    }

    > .wrapper {
      font-size: 0.6rem;
      > .read {
        color: #ff625d;
      }
      > .time {
        opacity: 50%;
      }
    }
  }
`;

const MessageByMe = styled.div`
  margin: 16px;
  display: flex;
  justify-content: flex-end;

  > .message-container {
    display: flex;
    position: relative;
    align-items: end;
    justify-content: flex-end;
    gap: 0.5rem;
    max-width: 80%;

    > .wrapper {
      text-align: right;
      font-size: 0.6rem;
      > .read {
        color: #ff625d;
      }
      > .time {
        opacity: 50%;
      }
    }

    > .tail {
      position: absolute;
      top: 0;
      right: -10px;
      width: 30px;
      height: 30px;
      clip-path: polygon(100% 0, 0 0, 0% 100%);
      background-color: #ff625d;
      z-index: -1;
    }

    > .message {
      width: fit-content;
      max-width: 100%; // 변경: content의 최대 너비를 wrapper에 맞게 조절
      background-color: #ff625d;
      padding: 10px;
      border-radius: 1rem;
      color: white;
      line-height: 1.5;
    }
  }
`;

export default Message;
