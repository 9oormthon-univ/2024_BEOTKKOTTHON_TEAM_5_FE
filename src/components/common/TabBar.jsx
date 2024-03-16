import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const BottomNavBar = () => {
  const [currentPage, setCurrentPage] = useState("/");
  const location = useLocation();

  useEffect(() => {
    setCurrentPage(location.pathname);
  }, [location]);

  const menus = [
    {
      name: "홈",
      path: "/home",
      icon: "/assets/home.png",
      iconActive: "/assets/home-fill.png",
    },
    {
      name: "채팅",
      path: "/chat",
      icon: "/assets/chat.png",
      iconActive: "/assets/chat-fill.png",
    },
    {
      name: "축제정보",
      path: "/festival",
      icon: "/assets/festival.png",
      iconActive: "/assets/festival-fill.png",
    },
    {
      name: "마이페이지",
      path: "/mypage",
      icon: "/assets/user.png",
      iconActive: "/assets/user-fill.png",
    },
  ];

  return (
    <StyledNav>
      {menus.map((item) => (
        <NavItem to={item.path} key={item.name}>
          <img
            src={currentPage === item.path ? item.iconActive : item.icon}
            alt={item.name}
          />
        </NavItem>
      ))}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: fixed;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  z-index: 9999;
  width: 100%;
  background-color: #fff;
  border-top: #ededed solid 1px;
  box-shadow: 0 -5px 25px #bbb;
`;

const NavItem = styled(Link)`
  text-align: center;
  width: 100%;
  padding: 16px 0;
`;

export default BottomNavBar;
