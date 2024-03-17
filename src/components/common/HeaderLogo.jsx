import styled from 'styled-components';

const WrapHeader = styled.header`
  padding-bottom: 1rem;

  img {
    width: 8rem;
  }
`;

const HeaderLogo = () => {

  return (
    <WrapHeader>
      <img src={'/assets/logo-pink.png'} />
    </WrapHeader>
  );
}

export default HeaderLogo;