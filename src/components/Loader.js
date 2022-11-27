import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const LoaderWrap = styled.div`
  width: 10%;
  height: 50%;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
`;

const Loader = () => {
  return (
    <LoaderWrap>
      <ReactLoading type="spin" color="#e6e8e7" />
    </LoaderWrap>
  );
};

export default memo(Loader);
