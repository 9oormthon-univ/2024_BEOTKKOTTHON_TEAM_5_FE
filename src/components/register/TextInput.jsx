import styled from "styled-components";
import Button from "../common/Button";
import { useId } from "react";

const Label = styled.label`
  font-weight: 700;
  color: #333333;
`;

const Input = styled.input`
  width: 100%;
  padding-top: 1rem;
  color: #333333;
  font-size: 1rem;
  border: none;

  &:focus {
    outline: none;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  /* align-items: center; */
  border-bottom: 1px solid #d9d9d9;
  padding-bottom: 0.3rem;

  &:focus-within {
    border-bottom: 2px solid #ff625d;
  }
`;

const TextInput = ({ label, buttonLabel, buttonClickHandler, ...props }) => {
  const id = useId();
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <InputWrapper>
        <Input id={id} {...props} />
        {buttonLabel && (
          <Button size="small" onClick={buttonClickHandler}>
            {buttonLabel}
          </Button>
        )}
      </InputWrapper>
    </div>
  );
};

export default TextInput;
