import styled from 'styled-components'
import Button from './Button'
import { useState, useRef } from 'react';

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  color: #333333;
`;
const Input = styled.input`
  width: 100%;
  padding-top: 0.5rem;
  background-color: transparent;
  color: #333333;
  font-size: 1rem;
  border:none;

  &:focus { 
    outline:none;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px solid #D9D9D9; 
  padding-bottom: 0.3rem;
  
  &:focus-within { 
    border-bottom: 2px solid #FF625D; 
  }
`;
const Tip = styled.p`
  display: block;
  visibility: ${({ $valid }) => $valid ? 'hidden' : 'visible'};
  white-space: nowrap;
  color:#90949B;
  font-weight: 600;
  font-size: 0.6rem;
`;


const TextInput = ({ label, buttonLabel, tip, idValid, idRef, passwordValid, passwordRef, ...props }) => {

  const idRef = useRef();
  const passwordRef = useRef();

  return (
    <div>
      {label && <Label>{label}</Label>}
      {(label === '아이디') ?
        <InputWrapper>
          <Input ref={idRef} {...props} />
          <Button
            bgColor={idValid ? 'gray' : 'coral'}
            textColor={idValid ? 'black' : 'white'}
            size={'small'}
            onClick={handleValidId}>
            {buttonLabel}
          </Button>
        </InputWrapper> :
        <>
          <InputWrapper>
            <Input type="password" ref={passwordRef} {...props} />
          </InputWrapper>
          <Tip $valid={passwordValid}>{tip}</Tip>
        </>
      }
    </div>
  );
}

export default TextInput;