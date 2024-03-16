import styled from "styled-components";

const ButtonStyle = styled.button`
  width: 100%;
  white-space: nowrap;
  font-weight: 600;
  color: ${({ $textColor }) => ($textColor === "white" ? "#FBFBFB" : "#333333")};
  background-color: ${({ $bgColor }) =>
    $bgColor === "coral" ? "#FF625D" : "#D9D9D9"};
  border: none;
  border-radius: ${({ $size }) => ($size === "large" ? "1rem" : "0.5rem")};
  padding: ${({ $size }) =>
    $size === "large"
      ? "1.5rem 6.5rem"
      : $size === "medium"
      ? "0.8rem 4.5rem"
      : $size === "small"
      ? "0.5rem 0.8rem"
      : "1rem 2rem"};
  font-size: ${({ $size }) =>
    $size === "large"
      ? "1.2rem"
      : $size === "medium"
      ? "1rem"
      : $size === "small"
      ? "0.8rem"
      : "1rem"};
`;

const Button = ({ children, bgColor, textColor, size, ...props }) => {
  return (
    <ButtonStyle $bgColor={bgColor} $textColor={textColor} $size={size} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
