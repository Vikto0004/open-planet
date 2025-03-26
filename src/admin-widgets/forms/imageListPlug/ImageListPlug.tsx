import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";

import { useDeleteSection } from "@/admin-shared/hooks/work-direction/useDeleteSection";

import css from "../forms.module.css";

const ImageListPlug = ({
  projectId,
  id,
  text,
  deletable = false,
}: {
  projectId?: string;
  id?: string;
  text: string;
  deletable?: boolean;
}) => {
  const { mutate } = useDeleteSection();
  const [localizedText, setLocalizedText] = useState(text);

  // Оновлення тексту при зміні пропса `text`
  useEffect(() => {
    setLocalizedText(text);
  }, [text]);

  return (
    <>
      <label className={css.label}>Зображення</label>
      <Box sx={{ display: "flex", gap: "20px", alignItems: "flex-end" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#8A939B",
            width: "calc(100vw / 3)",
            height: "56px",
          }}
          disabled
        >
          {localizedText}
        </Button>
        {deletable && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#8A939B",
              minWidth: "30px",
              height: "25px",
            }}
            onClick={() => {
              if (projectId && id) {
                mutate({ projectId: projectId, sectionId: id });
              }
            }}
          >
            Видалити
          </Button>
        )}
      </Box>
    </>
  );
};

export default ImageListPlug;
