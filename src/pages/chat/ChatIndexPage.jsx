import React from "react";

const ChatIndexPage = () => {
  return (
    <div>
      <div>진행중인 대화</div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "48px" }}>🐶</div>
        <div>
          <strong>경영학과 ENTJ</strong>
          <div>오 그러겡 ㅎㅎ 신기하당</div>
        </div>
        <div>14:19</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "48px" }}>🐱</div>
        <div>
          <strong>국어국문학과 INFP</strong>
          <div>안녕! 지금 어디야?</div>
        </div>
        <div>14:38</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div style={{ fontSize: "48px" }}>🐻</div>
        <div>
          <strong>사학과 ESFJ</strong>
          <div>이따 만날래? 공연장 앞에서 ㅎㅎ</div>
        </div>
        <div>18:33</div>
      </div>
    </div>
  );
};

export default ChatIndexPage;
