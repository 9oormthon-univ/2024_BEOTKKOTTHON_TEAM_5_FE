import React, { useEffect, useState } from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  display: flex;
  border: 1px solid #d9d9d9;
`;

const ToggleOption = styled.div`
  flex: 1;
  padding: 10px 20px;
  text-align: center;
  background-color: ${({ $isActive }) => ($isActive ? "#FF625D" : "#FBFBFB")};
  color: ${({ $isActive }) => ($isActive ? "white" : "black")};
  transition: background-color 0.3s, color 0.3s;
`;

const Label = styled.label`
  display: block;
  font-weight: 700;
  color: #333333;
  margin-bottom: 1rem;
`;

const ToggleSwitch = ({ label, options = ["남", "여"], setState }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setState(activeIndex === 1 ? "F" : "M");
  }, [setState, activeIndex]);

  return (
    <div>
      <Label>{label}</Label>
      <ToggleContainer>
        {options.map((option, index) => (
          <ToggleOption
            key={index}
            $isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}>
            {option}
          </ToggleOption>
        ))}
      </ToggleContainer>
    </div>
  );
};

export default ToggleSwitch;
