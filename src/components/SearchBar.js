import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Form = styled.form``;

const SearchBarContainer = styled.div`
  border-bottom: 1px solid #e6e8e7;
  margin-right: 20px;
  width: 300px;
  /* width: 100vw; */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  border: none;
  line-height: 40px;
  padding: 0px 10px;
  display: flex;
  outline: none;
`;

const SearchButton = styled.button`
  border: none;
  background-color: white;
  color: black;
  /* margin-right: 20px; */
  display: flex;
`;

const SearchBar = () => {
  return (
    <Form>
      <SearchBarContainer>
        <Input type="text" placeholder="검색" />
        <SearchButton type="submit">
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </SearchButton>
      </SearchBarContainer>
    </Form>
  );
};

export default SearchBar;
