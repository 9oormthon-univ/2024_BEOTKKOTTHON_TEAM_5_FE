import React from "react";
import styled from "styled-components";

const AnimalSelector = ({ label, clickHandler }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Wrapper onClick={clickHandler}>
        <StyledInput>
          🐶
          <input type="radio" name="animal" value="DOG" />
        </StyledInput>
        <StyledInput>
          🐱
          <input type="radio" name="animal" value="CAT" />
        </StyledInput>
        <StyledInput>
          🐰
          <input type="radio" name="animal" value="RABBIT" />
        </StyledInput>
        <StyledInput>
          🐹
          <input type="radio" name="animal" value="HAMSTER" />
        </StyledInput>
        <StyledInput>
          🦊
          <input type="radio" name="animal" value="FOX" />
        </StyledInput>
        <StyledInput>
          🐵
          <input type="radio" name="animal" value="MONKEY" />
        </StyledInput>
        <StyledInput>
          🐻
          <input type="radio" name="animal" value="BEAR" />
        </StyledInput>
        <StyledInput>
          🐼
          <input type="radio" name="animal" value="PANDA" />
        </StyledInput>
      </Wrapper>
    </div>
  );
};

export default AnimalSelector;

const Wrapper = styled.div`
  padding: 0 2rem;
  display: flex;
  min-height: 56px;
  overflow-x: scroll;
  gap: 1rem;
`;

const StyledInput = styled.label`
  position: relative;
  font-size: 48px;
  line-height: 1;

  > input {
    appearance: none;
    -webkit-appearance: none;
    position: absolute;
  }

  > input[type="radio"]:checked {
    &::before {
      content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23fff'%3E%3Cpath d='M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z'/%3E%3C/svg%3E");
      position: absolute;
      top: 0;
      right: 4px;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background-color: #ff625d;
    }
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 16px;
  padding-left: 2rem;
`;
