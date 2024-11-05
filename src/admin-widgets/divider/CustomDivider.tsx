import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useCreateTextSection } from "@/admin-shared/hooks/work-direction/text-section/useCreateTextSection";
import { useDeleteTextSection } from "@/admin-shared/hooks/work-direction/text-section/useDeleteTextSection";

const CustomDivider = ({
  action,
  cardId,
  sectionId,
}: {
  action: "add" | "delete" | "both";
  cardId?: string;
  sectionId?: string;
}) => {
  const { mutate, isPending } = useCreateTextSection();
  const { mutate: mutateDelete, isPending: deletePending } =
    useDeleteTextSection();

  const createTextSection = () => {
    if (cardId) {
      mutate(cardId);
    }
  };

  const deleteTextSection = () => {
    if (cardId && sectionId) {
      mutateDelete({ cardId, sectionId });
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
            sx={{
              textTransform: "none",
              backgroundColor: "#8A939B",
              minWidth: "30px",
              height: "25px",
              borderRadius: "",
            }}
            onClick={createTextSection}
            disabled={isPending}
          >
            Додати
          </Button>
        )}
        {action === "delete" && (
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              backgroundColor: "#8A939B",
              minWidth: "30px",
              height: "25px",
            }}
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
              sx={{
                textTransform: "none",
                backgroundColor: "#8A939B",
                minWidth: "30px",
                height: "25px",
                borderRadius: "",
              }}
              onClick={createTextSection}
              disabled={isPending}
            >
              Додати
            </Button>
            <Divider orientation="vertical" flexItem />

            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                backgroundColor: "#8A939B",
                minWidth: "30px",
                height: "25px",
              }}
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
