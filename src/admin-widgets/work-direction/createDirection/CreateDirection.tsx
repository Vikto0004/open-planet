import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

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
      <Modal open={open} handleClose={handleClose} width={700}>
        {isPending ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <BeatLoader color="#1677ff" />
          </Box>
        ) : (
          <FirstForm id={data?.response._id} closeModal={handleClose} />
        )}
      </Modal>
    </>
  );
};

export default CreateDirection;
