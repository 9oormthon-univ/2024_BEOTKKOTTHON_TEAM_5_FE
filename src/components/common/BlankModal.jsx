import styled from "styled-components";
import { useRef, forwardRef, useImperativeHandle } from "react";

const BlankModal = forwardRef(({ children }, ref) => {
  const modalRef = useRef();

  useImperativeHandle(ref, () => {
    return {
      open() {
        modalRef.current.showModal();
      },
      close() {
        modalRef.current.close();
      },
    };
  });

  return <StyledDialog ref={modalRef}>{children}</StyledDialog>;
});

export default BlankModal;

const StyledDialog = styled.dialog`
  max-width: 80%;
  border: none;
  padding: 0;
  border-radius: 8px;
  box-shadow: 0px 4px 10px 10px #3333334d;
  position: relative;
`;
