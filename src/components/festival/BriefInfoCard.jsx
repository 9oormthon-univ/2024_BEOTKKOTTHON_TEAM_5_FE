import React from "react";
import styled from "styled-components";

const WrapCard = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  height: 100px;
  border-radius: 1rem;
  box-shadow: 0px 5px 50px 1px #33333333;
  overflow: hidden;

  img {
    width: 100px;
    height: 100%;
    object-fit: cover;
  }
`;
const TextDiv = styled.div`
  width: 100%;
  align-items: center;

  .title {
    font-size: 1.2rem;
    font-weight: 600;
    line-height: 1.5rem;
  }
  .date {
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 1rem;
  }
  .location {
    display: flex;
    width: 100%;
    font-size: 0.7rem;
    font-weight: 600;
    line-height: 1rem;

    img {
      width: 0.8rem;
      padding-right: 0.2rem;
    }
  }
`;

const BriefInfoCard = ({ onClick, content }) => {

  return (
    <WrapCard onClick={onClick}>
      <img src={content.img} alt="festival" />
      <TextDiv>
        <div className="title">{content.title}</div>
        <div className="date">{content.date}</div>
        <br />
        <div className="location">
          <img src="/assets/festival/icon-location.svg" alt="location icon" />
          {content.place}
        </div>
      </TextDiv>
    </WrapCard>
  );
};

export default BriefInfoCard;
