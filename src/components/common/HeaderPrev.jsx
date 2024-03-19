import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const WrapHeader = styled.header`
  display: flex;
  gap: 1rem;

  img {
    max-width: 1rem;
    object-fit: contain;
  }

  .title-big {
    font-size: 2rem;
    font-weight: 700;
  }
  .title-small {
    font-size: 0.8rem;
    font-weight: 700;
    color: #979797;
  }
`;

const HeaderPrev = ({title, navigateTo}) => {

  const navigate = useNavigate();

  return (
    <WrapHeader>
      <img 
        src="/assets/arrow-pink-button.png" 
        alt="Go Back"
        onClick={() => navigate(navigateTo)} />
      <h2>{title}</h2>
    </WrapHeader>
  );
};

export default HeaderPrev;
