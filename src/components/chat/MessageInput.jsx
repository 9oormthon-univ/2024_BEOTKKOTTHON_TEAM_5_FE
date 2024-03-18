import styled from "styled-components";

const MeassageInputContainer = styled.div`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  background: #ffffff;
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
  background: #f8f8f8;
  border: 1px solid #dedede;
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
        <img src={"/assets/media-button.png"} alt="Media" />
      </WrapButton>
      <WrapInputForm
        onSubmit={(e) => {
          e.preventDefault();
        }}>
        <Input />
        <WrapButton>
          <img src={"/assets/send-button.png"} alt="Send" />
        </WrapButton>
      </WrapInputForm>
    </MeassageInputContainer>
  );
};

export default MessageInput;
