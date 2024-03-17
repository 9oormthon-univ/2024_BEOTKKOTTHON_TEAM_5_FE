import styled from "styled-components";
import { useRef, forwardRef, useImperativeHandle } from "react";
import Button from "./Button";

const StyledDialog = styled.dialog`
  border: none;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 4px 10px 10px #3333334d;
  position: relative;
`;

const CloseButton = styled.button`
  flex: 1;
  background: none;
  border: none;

  img {
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
  }
`;

const WrapContent = styled.div`
  display: flex;
`;

const Modal = forwardRef(
  ({ content, buttonLabel, closeButton = true, title = "" }, ref) => {
    const dialog = useRef();
    const handleCloseModal = () => {
      dialog.current.close();
    };

    useImperativeHandle(ref, () => {
      return {
        open() {
          dialog.current.showModal();
        },
        close() {
          dialog.current.close();
        },
      };
    });

    return (
      <>
        <StyledDialog ref={dialog}>
          <div>
            {title && <h2>{title}</h2>}
            {closeButton && (
              <CloseButton type="button" onClick={handleCloseModal}>
                <img src={"/assets/cancel-button.png"} alt="Close" />
              </CloseButton>
            )}
            <WrapContent>{content}</WrapContent>
            {buttonLabel && (
              <Button size="medium" onClick={handleCloseModal}>
                {buttonLabel}
              </Button>
            )}
          </div>
        </StyledDialog>
      </>
    );
  }
);

export default Modal;
