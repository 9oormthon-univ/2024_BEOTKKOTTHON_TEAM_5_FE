import styled from "styled-components";

const WrapHeader = styled.header`
  padding-bottom: 2rem;

  img {
    width: 8rem;
  }
`;

const Header = () => {
  return (
    <WrapHeader>
      <img src="/assets/logo-pink.png" alt="디스턴스 로고" />
    </WrapHeader>
  );
};

export default Header;
