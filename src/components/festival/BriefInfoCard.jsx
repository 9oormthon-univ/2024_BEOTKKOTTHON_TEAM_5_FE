import React from "react";
import styled from "styled-components";

const WrapCard = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
  border-radius: 1rem;
  box-shadow: 0px 5px 50px 1px #33333333;
  overflow: hidden; 
  
  img {
    width: 25%;
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


const BriefInfoCard = ({onClick}) => {

  return (
    <WrapCard onClick={onClick}>
      <img
        src={'/assets/festival/temp-img.png'}
        alt="festival image" />
      <TextDiv>
        <div className="title">팔씨름</div>
        <div className="date">2023.09.20 ~ 2023.09.21</div>
        <br />
        <div className="location">
          <img
            src='/assets/festival/icon-location.svg'
            alt="location icon" />
          전남대학교 5.18 광장부스
        </div>
      </TextDiv>
    </WrapCard>
  )
}

export default BriefInfoCard;