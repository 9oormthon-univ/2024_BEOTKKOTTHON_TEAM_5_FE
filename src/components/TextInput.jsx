import styled from 'styled-components'
import Button from './Button'
import { useState } from 'react';

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


const TextInput = ({ label, ...props }) => {

  const [activeInput, setActiveInput] = useState(false);

  const handleInput = (event) => {
    if (event.target.value) {
      setActiveInput(true);
    } else {
      setActiveInput(false);
    }
  }

  return (
    <div>
      {label && <Label>{label}</Label>}
      {(label === '아이디') ?
        <InputWrapper>
          <Input
            onChange={handleInput} {...props} />
          <Button
            bgColor={activeInput ? 'coral' : 'gray'}
            textColor={activeInput ? 'white' : 'black'}
            size={'small'}>
            중복 확인하기
          </Button>
        </InputWrapper> :
        <InputWrapper>
          <Input type="password" {...props} />
        </InputWrapper>
      }
    </div>
  );
}

export default TextInput;