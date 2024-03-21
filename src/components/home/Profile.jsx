import styled from "styled-components";
import Characters from "../../constants/character";
import { useEffect } from "react";

const WrapPofile = styled.article`
  width: 100%;
  border-radius: 12px;
  background: #fcfcfc;
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
  ${({ $side }) => ($side === "left" ? "right: 15%;" : "left: 15%;")}
`;

const TextDiv = styled.div`
  padding: 10px;

  .text-major {
    white-space: nowrap;
    font-size: 1.4rem;
    font-weight: 700;
  }
  .text-mbti {
    font-size: 1rem;
    font-weight: 700;
  }
  .text-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.2rem;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 0.8rem;
  }
`;

const Profile = ({ id, side, profile, ...props }) => {
  // 글씨 크기 동적으로 조절
  useEffect(() => {
    const textMajorElement = document.querySelector(`.text-major-${id}`);

    const aLetter = 22.4; // 대략적인 1.4rem
    const innerTextLength = textMajorElement.innerText.length;
    const parentWidth = textMajorElement.closest("article").offsetWidth;

    if (textMajorElement) {
      if (aLetter * innerTextLength > parentWidth) {
        let adjustedALetter = parentWidth / innerTextLength;
        adjustedALetter = Math.floor(adjustedALetter);
        textMajorElement.style.fontSize = `${adjustedALetter}px`;
      }
    }
  }, [id]);

  return (
    <WrapPofile {...props}>
      <CharacterDiv>
        <StyledImage
          $side={side}
          src={Characters[profile.memberInfoDto.memberCharacter]}
        />
      </CharacterDiv>
      <TextDiv>
        <div className={`text-major text-major-${id}`}>
          {profile.department}
        </div>
        <div className="text-mbti">{profile.memberInfoDto.mbti}</div>
        <div className="text-tags">
          {profile.memberInfoDto.memberHobbyDto.map((tag, index) => (
            <div key={index}>#{tag.hobby} </div>
          ))}
          {profile.memberInfoDto.memberTagDto.map((tag, index) => (
            <div key={index}>#{tag.tag} </div>
          ))}
        </div>
      </TextDiv>
    </WrapPofile>
  );
};
export default Profile;
