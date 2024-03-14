import React from "react";

const ProfileRegisterPage = () => {
  return (
    <div>
      <h1>프로필을 등록해주세요</h1>
      <h2>캐릭터 선택하기</h2>
      <div style={{ fontSize: "48px" }}>🐱 🐶 🐰 🐹</div>
      <h2>MBTI 선택하기</h2>
      <select>
        <option value="" disabled selected>
          MBTI를 선택해주세요.
        </option>
        <option value="INFP">INFP</option>
        <option value="ENTJ">ENTJ</option>
        <option value="etc">기타 등등</option>
      </select>
      <h2>해시태그 선택하기</h2>
      <div>선택...</div>
    </div>
  );
};

export default ProfileRegisterPage;
