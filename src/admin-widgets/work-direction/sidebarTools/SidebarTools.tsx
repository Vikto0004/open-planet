import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useCreateSection } from "@/admin-shared/hooks/work-direction/useCreateSection";

const SidebarTools = ({
  isPostable,
  shouldSave,
  id,
}: {
  isPostable: boolean;
  shouldSave: boolean;
  id: string;
}) => {
  const { mutate, status } = useCreateSection();
  const isLoading = status === "pending";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "fixed",
        top: "130px",
        height: "100%",
      }}
    >
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => mutate({ projectId: id, type: "title" })}
        disabled={isLoading}
      >
        Заголовок
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => mutate({ projectId: id, type: "subtitle" })}
        disabled={isLoading}
      >
        Підзаголовок
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => mutate({ projectId: id, type: "paragraph" })}
        disabled={isLoading}
      >
        Параграф
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => mutate({ projectId: id, type: "budgetCards" })}
        disabled={isLoading}
      >
        Бюджетні картки
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => mutate({ projectId: id, type: "imageList" })}
        disabled={isLoading}
      >
        Зображення
      </Button>
    </Box>
  );
};

export default SidebarTools;
