import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBarContainer = styled.div`
  border-bottom: 1px solid #e6e8e7;
  margin: 0 20px;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 100vw;
  border: none;
  line-height: 40px;
  padding: 0px 10px;
  display: flex;
`;

const SearchButton = styled.button`
  border: none;
  background-color: white;
  margin-right: 20px;
  display: flex;
`;

const SearchBar = () => {
  return (
    <form>
      <SearchBarContainer>
        <Input type="text" placeholder="검색" />
        <SearchButton type="submit">
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </SearchButton>
      </SearchBarContainer>
    </form>
  );
};

export default SearchBar;
