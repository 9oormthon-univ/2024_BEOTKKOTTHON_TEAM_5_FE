import React from "react";
import { Outlet } from "react-router-dom";
import TabBar from "../components/common/TabBar";
import styled from "styled-components";

const NavLayout = () => {
  return (
    <>
      <Padding>
        <Outlet />
      </Padding>
      <TabBar />
    </>
  );
};

const Padding = styled.div`
  padding-bottom: 96px;
`;

export default NavLayout;
