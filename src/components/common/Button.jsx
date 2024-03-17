import styled from "styled-components";

const ButtonStyle = styled.button`
  white-space: nowrap;
  font-weight: 600;
  color: #fbfbfb;
  background-color: #ff625d;
  border: none;
  border-radius: ${({ size }) => (size === "large" ? "1rem" : "0.5rem")};
  padding: ${({ size }) =>
    size === "large"
      ? "1.5rem 6.5rem"
      : size === "medium"
      ? "0.8rem 4.5rem"
      : size === "small"
      ? "0.5rem 0.8rem"
      : "1rem 2rem"};
  font-size: ${({ size }) =>
    size === "large"
      ? "1.2rem"
      : size === "medium"
      ? "1rem"
      : size === "small"
      ? "0.8rem"
      : "1rem"};

  &:disabled {
    background-color: #d9d9d9;
    color: #333333;
  }
`;

const Button = ({ children, size, ...props }) => {
  return (
    <ButtonStyle size={size} {...props}>
      {children}
    </ButtonStyle>
  );
};

export default Button;
