import { Button } from "@mui/material";
import { useState } from "react";

import { useCreateDirection } from "@/admin-shared/hooks";
import FirstForm from "@/admin-widgets/forms/firstForm/FirstForm";
import Modal from "@/admin-widgets/modal/Modal";

const CreateDirection = ({ language }: { language: "uk" | "en" }) => {
  const { mutate, isPending, data } = useCreateDirection();
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    mutate(language);
    if (!isPending) {
      setOpen(true);
    }
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
        disabled={isPending}
      >
        Створити
      </Button>
      <Modal open={open && !isPending} handleClose={handleClose} width={700}>
        <FirstForm id={data?.response._id} closeModal={handleClose} />
      </Modal>
    </>
  );
};

export default CreateDirection;
