import React from "react";
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";
import Header from "../../components/common/Header";

const DetailContainer = styled.section`
  padding: 2rem 1.5rem;
`;
const PrevButton = styled.img`
  position: fixed;
  left: 1.5rem;
  bottom: 5rem;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0px 2px 8px 0px #33333366;
`;
const TextDiv = styled.article`

  width: 100%;
  align-items: center;

  .title {
    position: relative;
    font-size: 2rem;
    font-weight: 700;
    margin-top: 1.5rem;

    img {
      position: absolute;
      right: 0;
    }
  }
  .date {
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 22px;
  }
  .location {
    display: flex;
    width: 100%;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1rem;
    color: #898989;

    img {
      width: 1rem;
      padding-right: 0.2rem;
    }
  }
`;
const ContentDiv = styled.article`
  
`;
const CardDiv = styled.div`
  display: flex;
  overflow: auto;
  white-space: nowrap;
  gap: 0.5rem;
  padding: 1rem 0;
`;
const ContextDiv = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const FestivalDetailPage0 = () => {

  const navigate = useNavigate();

  const shareButtonHandler = () => {
    if (navigator.share) {
      navigator.share({
        title: '개회식',
        text: '개회식에 대한 정보를 확인해 보세요!',
        url: window.location.href,
      })
      .then(() => alert('공유가 성공적으로 완료되었습니다.'))
      .catch((error) => console.log('공유에 실패했습니다.', error));
    } else {
      alert('이 브라우저에서는 공유 기능을 사용할 수 없습니다.');
    }
  };
  

  return (
    <DetailContainer>

      <Header />
      <TextDiv>
        <div className="title">
          개회식
          <img src={"/assets/festival/share-button.png"} alt="Share button" onClick={shareButtonHandler}/>
        </div>
        <div className="date">2024.03.24 (토) 14:00</div>
        <br />
        <div className="location">
          <img
            src='/assets/festival/icon-location.svg'
            alt="location icon" />
          전남대학교 5.18 광장부스
        </div>
      </TextDiv>
      <ContentDiv>
        <CardDiv>
          <img src="/assets/festival/temp-img.png" alt="Card News" />
          <img src="/assets/festival/temp-img.png" alt="Card News" />
          <img src="/assets/festival/temp-img.png" alt="Card News" />
          <img src="/assets/festival/temp-img.png" alt="Card News" />
        </CardDiv>
        <ContextDiv>
          2023 ‘용봉대동풀이'에서 피지컬 100의 강자를 이길 도전자를 찾습니다. 🔥
          <br /><br />
          힘에 자신이 있는 분 💪, 운동을 좋아하시는 분 🏋️ 등 비밀정원의 강자들을 찾습니다!
          <br /><br />
          이 이벤트를 통해 피지컬 100의 강자와의 팔씨름을 할 수 있고, 이긴다면 상금까지 가져가실 수 있습니다. 💵
          <br /><br />
          5.18 광장 부스에서 만나요! 🙌
        </ContextDiv>

      </ContentDiv>
      <PrevButton
        src="/assets/festival/prev-button.png"
        alt="Prev button"
        onClick={() => navigate('/festival/program')} />
    </DetailContainer>
  )
}

export default FestivalDetailPage0;