import React, { useEffect, useState } from "react";
import styled from "styled-components";
import appname from "../assets/img/appname.png";
import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  /* border-bottom: 1px solid #fff; */
  /* box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  margin: 0px;
  padding: 10px 10px;
  font-family: "Jua", sans-serif;
`;

const Logo = styled.img`
  width: 100px;
  height: 30px;
`;

function Header() {
  const navigate = useNavigate();

  const logoHandler = () => {
    navigate("/");
  };

  return (
    <HeaderContainer>
      <Logo src={appname} onClick={logoHandler} />
    </HeaderContainer>
  );
}

export default Header;
