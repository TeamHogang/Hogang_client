import React from "react";
import styled from "styled-components";
// import { useNavigate } from "react-router-dom";

const HeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
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
  padding: 20px 10px;
`;

function Header() {
  return (
    <HeaderContainer>
      <div>로고 또는 앱 이름</div>
    </HeaderContainer>
  );
}

export default Header;
