import styled from 'styled-components';

const WrapHeader = styled.header`
  padding-bottom: 1rem;

  img {
    width: 8rem;
  }
`;

const Header = () => {

  return (
    <WrapHeader>
      <img src={'/assets/logo-pink.png'} />
    </WrapHeader>
  );
}

export default Header;