import React from "react";
import styled from "styled-components";

const WrapForm = styled.div`
  padding: 2rem 0 2rem 1rem;
`;
const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.6rem;
`
const CardDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  gap: 1rem;
  padding: 1rem 0;
`;
const TextDiv = styled.div`
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5rem;
`;

const GuideForm = () => {
  return (
    <WrapForm>
      <Title>주차 및 통제 구역 안내</Title>
      <CardDiv>
        <img src="/assets/festival/temp-img.png" alt="Card News" />
        <img src="/assets/festival/temp-img.png" alt="Card News" />
        <img src="/assets/festival/temp-img.png" alt="Card News" />
        <img src="/assets/festival/temp-img.png" alt="Card News" />
      </CardDiv>
      <TextDiv>
        당일 부스 설치 등으로 인해 정문부터 후문을 잇는 메인 도로를 통제합니다. 이에 많은 차량이 교내로 진입 시 이동이 원활하지 않아 학교 내부가 혼잡해질 가능성이 있습니다. 이에 학교 근처에 있는 외부 주차장에 대해 알려드리려고 합니다.
      </TextDiv>
    </WrapForm>
  )
}

export default GuideForm;