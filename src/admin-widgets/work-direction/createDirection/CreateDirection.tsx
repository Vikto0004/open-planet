import { Button } from "@mui/material";
import { useState } from "react";

import FirstForm from "@/admin-widgets/forms/firstForm/FirstForm";
import Modal from "@/admin-widgets/modal/Modal";

const CreateDirection = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
      setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{ textTransform: "none" }}
      >
        Створити
      </Button>
      <Modal open={open} handleClose={handleClose} width={700}>
          <FirstForm closeModal={handleClose} />
      </Modal>
    </>
  );
};

export default CreateDirection;
