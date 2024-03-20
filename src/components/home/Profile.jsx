import styled from 'styled-components';
import Characters from '../../constants/character';

const WrapPofile = styled.article`
  width: 100%;
  border-radius: 12px;
  background: #FCFCFC;
  box-shadow: 0px 4px 10px 2px #33333366;
  overflow: hidden;
`;

const CharacterDiv = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;
const StyledImage = styled.img`
  width: 100%;
  position: relative;
  ${({ $side }) => $side === 'left' ? 'right: 15%;' : 'left: 15%;'}
`;

const TextDiv = styled.div`
  padding: 10px;

  .text-major {
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: 800;
  }
  .text-mbti {
    font-size: 1rem;
    font-weight: 700;
  }
  .text-tags {
    font-size: 0.8rem;
    font-weight: 500;
    margin-top: 0.8rem;
  }
`;

const Profile = ({ side, profile, ...props}) => {

  return (
    <WrapPofile {...props}>
      <CharacterDiv>
        <StyledImage $side={side} src={Characters[profile.memberCharacter]} />
      </CharacterDiv>
      <TextDiv>
        <div className="text-major">{profile.department}</div>
        <div className="text-mbti">{profile.mbti}</div>
        {/* <div className="text-tags">
          {profile.tags.map((tag, index) => {
            return <span key={index}>#{tag} </span>
          })}
        </div> */}
      </TextDiv>
    </WrapPofile>
  )
}
export default Profile;