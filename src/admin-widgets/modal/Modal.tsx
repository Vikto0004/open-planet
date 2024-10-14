import { Modal as ModalComponent } from "@mui/material";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface IModalProps {
  children: ReactNode;
  open: boolean;
  handleClose: () => void;
  width: number;
  height: number;
}

const Modal = ({ children, open, handleClose, width, height }: IModalProps) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    justifyContent: "center",
    width: width,
    height: height,
    bgcolor: "background.paper",
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
  };

  return (
    <>
      <ModalComponent open={open} onClose={handleClose}>
        <Box sx={style}>{children}</Box>
      </ModalComponent>
    </>
  );
};

export default Modal;
