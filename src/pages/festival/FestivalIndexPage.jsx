import React from "react";
import { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

import Header from "../../components/common/Header";
import BriefInfoCard from "../../components/festival/BriefInfoCard";
import GuideForm from "../../components/festival/GuideForm"

const FestivalContainer = styled.div`
  padding: 2rem 1.5rem;
`;
const TabMenu = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`;
const Tab = styled.div`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  border-bottom: ${props => props.$isSelected ? "3px solid #FF625D" : "3px solid transparent"};
  transition: all 200ms;
`;
const Title = styled.div`
  font-size: 36px;
  font-weight: 700;
  margin-top: 1.5rem;
`;
const Date = styled.div`
  font-size: 1rem;
  font-weight: 600;
  padding: 1.5rem 0;
`
const WrapCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`
const Partition = styled.div`
  width: 100%;
  height: 0.3rem;
  background-color: #D9D9D9;
`;

const FestivalIndexPage = () => {

  const navigate = useNavigate();
  const [tabMenuState, setTabMenuState] = useState(0);
  
  
  const handleRouter = () => {
    navigate("/festival/:pageId");
  }
  
  const contentState = [
    {
      content: (
        <>
          <Title>구름톤대학교</Title>
          <Date>9월 20일</Date>
          <WrapCards>
            <BriefInfoCard onClick={handleRouter} />
            <BriefInfoCard />
            <BriefInfoCard />
          </WrapCards>
          <Date className="cardsDate">9월 20일</Date>
          <WrapCards>
            <BriefInfoCard />
            <BriefInfoCard />
            <BriefInfoCard />
          </WrapCards>
        </>
      )
    },
    {
      content: (
        <>
          <Title>타임테이블</Title>
        </>
      )
    },
    {
      content: (
        <>
          <GuideForm />
          <Partition />
          <GuideForm />
          <Partition />
          <GuideForm />
        </>
      )
    },

  ];


  return (
    <FestivalContainer>
      <Header />
      <TabMenu>
        <Tab
          $isSelected={tabMenuState === 0}
          onClick={() => setTabMenuState(0)}>프로그램</Tab>
        <Tab
          $isSelected={tabMenuState === 1}
          onClick={() => setTabMenuState(1)}>공연</Tab>
        <Tab
          $isSelected={tabMenuState === 2}
          onClick={() => setTabMenuState(2)}>안내사항</Tab>
      </TabMenu>
      <div>
        {contentState[tabMenuState].content}
      </div>
    </FestivalContainer>
  )
};

export default FestivalIndexPage;
