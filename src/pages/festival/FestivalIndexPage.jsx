import React from "react";
import { useState } from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Header from "../../components/common/Header";

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

const FestivalIndexPage = () => {

  const navigate = useNavigate();
  const [tabMenuState, setTabMenuState] = useState(0);

  const handleOnProgram = () => {
    navigate("/festival/program");
    setTabMenuState(0);
  }
  const handleOnSchedule = () => {
    navigate("/festival/schedule");
    setTabMenuState(1);
  }
  const handleOnInfo = () => {
    navigate("/festival/information");
    setTabMenuState(2);
  }

  return (
    <FestivalContainer>
      <Header />
      <TabMenu>
        <Tab
          $isSelected={tabMenuState === 0}
          onClick={handleOnProgram}>프로그램</Tab>
        <Tab
          $isSelected={tabMenuState === 1}
          onClick={handleOnSchedule}>일정</Tab>
        <Tab
          $isSelected={tabMenuState === 2}
          onClick={handleOnInfo}>공지사항</Tab>
      </TabMenu>
      <Outlet/>
    </FestivalContainer>
  )
};

export default FestivalIndexPage;
