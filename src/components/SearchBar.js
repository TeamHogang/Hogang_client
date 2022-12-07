import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "react-router-dom";
import { Search } from "../api/articleApi";

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

const SearchBar = (props) => {
  // const [keyword, setKeyword] = useState();

  const searchChange = (e) => {
    props.setKeyword(e.target.value);
    // console.log(keyword);
  };

  return (
    <Form>
      <SearchBarContainer>
        <Input type="text" placeholder="검색" onChange={searchChange} />
        {/* <SearchButton type="submit" onClick={searchHandler}>
          <FontAwesomeIcon icon={faSearch} size="xl" />
        </SearchButton> */}
      </SearchBarContainer>
    </Form>
  );
};

export default SearchBar;
