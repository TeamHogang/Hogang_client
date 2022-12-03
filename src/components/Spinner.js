import React from "react";
import styled from "styled-components";

const Loading = styled.div`
  width: 50px;
  height: 50px;
  border: 10px solid #9bb7d6;
  border-top: 10px solid #9bb7d6;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;
`;

const LoadingContainer = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  height: 350px;
`;

export default function Spinner() {
  return (
    <LoadingContainer>
      <Loading></Loading>
    </LoadingContainer>
  );
}
