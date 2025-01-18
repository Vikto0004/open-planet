import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useCreateTextSection } from "@/admin-shared/hooks/work-direction/useCreateTextSection";
import { useDeleteTextSection } from "@/admin-shared/hooks/work-direction/useDeleteTextSection";

// Reusable button styles
const buttonStyles = {
  textTransform: "none",
  backgroundColor: "#8A939B",
  minWidth: "30px",
  height: "25px",
};

const CustomDivider = ({
  action,
  cardId,
  sectionId,
  text,
}: {
  action: "add" | "delete" | "both";
  cardId?: string;
  sectionId?: string;
  text: string;
}) => {
  const { mutate, isPending } = useCreateTextSection();
  const { mutate: mutateDelete, isPending: deletePending } =
    useDeleteTextSection();

  const createTextSection = () => {
    if (cardId) {
      mutate({ projectId: cardId, sectionId: sectionId || "", text });
    }
  };

  const deleteTextSection = () => {
    if (cardId && sectionId) {
      mutateDelete({ projectId: cardId, sectionId });
    }
  };

  return (
    <Divider
      textAlign="right"
      sx={{ flex: 1, marginTop: "10px", marginBottom: "10px" }}
    >
      <Box display="flex" gap={2}>
        {action === "add" && (
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={createTextSection}
            disabled={isPending}
          >
            Додати
          </Button>
        )}

        {action === "delete" && (
          <Button
            variant="contained"
            sx={buttonStyles}
            onClick={deleteTextSection}
            disabled={deletePending}
          >
            Видалити
          </Button>
        )}

        {action === "both" && (
          <>
            <Button
              variant="contained"
              sx={buttonStyles}
              onClick={createTextSection}
              disabled={isPending}
            >
              Додати
            </Button>
            <Divider orientation="vertical" flexItem />
            <Button
              variant="contained"
              sx={buttonStyles}
              onClick={deleteTextSection}
              disabled={deletePending}
            >
              Видалити
            </Button>
          </>
        )}
      </Box>
    </Divider>
  );
};

export default CustomDivider;
