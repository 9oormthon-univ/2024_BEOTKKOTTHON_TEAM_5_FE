import React, { useState } from 'react';
import styled from 'styled-components';

const ToggleContainer = styled.div`
  display: flex;
  border: 1px solid #D9D9D9;
`;

const ToggleOption = styled.div`
  flex: 1;
  padding: 10px 20px;
  text-align: center;
  background-color: ${({ isActive }) => (isActive ? '#FF625D' : '#FBFBFB')};
  color: ${({ isActive }) => (isActive ? 'white' : 'black')};
  transition: background-color 0.3s, color 0.3s;
`;

const ToggleSwitch = ({ options = ['남', '여'] }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ToggleContainer>
      {options.map((option, index) => (
        <ToggleOption
          key={index}
          isActive={index === activeIndex}
          onClick={() => setActiveIndex(index)}
        >
          {option}
        </ToggleOption>
      ))}
    </ToggleContainer>
  );
};

export default ToggleSwitch;
