import styled from 'styled-components'
import mediaButton from '../assets/media-button.png';
import sendButton from '../assets/send-button.png';

const MeassageInputContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  background: #FFFFFF;
  width: auto;
  padding: 0.5rem 1rem 3rem 1rem;
`;

const Input = styled.input`
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  padding: 0.2rem 0.4rem;

  
`;
const WrapInputForm = styled.form`
  display: flex;
  flex: 1;
  align-items: center;
  background: #F8F8F8;
  border: 1px solid #DEDEDE;
  width: auto;
  border-radius: 1rem;
  padding: 0.2rem 0.4rem;
`;

const WrapButton = styled.div`
  display: flex;
  align-items: center;

  img {
    width: 1.5rem;
  }
`;

const MessageInput = () => {

  return (
    <MeassageInputContainer>
      <WrapButton>
        <img src={mediaButton} alt="Media" />
      </WrapButton>
      <WrapInputForm>
        <Input />
        <WrapButton>
          <img src={sendButton} alt="Media" />
        </WrapButton>  
      </WrapInputForm>
    </MeassageInputContainer>
  )
}

export default MessageInput;