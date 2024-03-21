import React from "react";
import styled from "styled-components";
import Characters from "../../constants/character";

const AnimalSelector = ({ label, clickHandler }) => {
  return (
    <div>
      <Label>{label}</Label>
      <Wrapper onClick={clickHandler}>
        <StyledInput>
          <img src={Characters.DOG} />
          <input type="radio" name="animal" value="DOG" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.CAT} />
          <input type="radio" name="animal" value="CAT" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.RABBIT} />
          <input type="radio" name="animal" value="RABBIT" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.RAT} />
          <input type="radio" name="animal" value="HAMSTER" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.FOX} />
          <input type="radio" name="animal" value="FOX" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.MONKEY} />
          <input type="radio" name="animal" value="MONKEY" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.BEAR} />
          <input type="radio" name="animal" value="BEAR" />
        </StyledInput>
        <StyledInput>
          <img src={Characters.PANDA} />
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
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
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

  > img {
    width: 3rem;
  }
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: 16px;
  padding-left: 2rem;
`;
