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
  console.log(id)
  const { mutate } = useCreateSection();
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
      >
        Заголовок
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Підзаголовок
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Параграф
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Бюджентні картки
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Зображення
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        disabled={!isPostable || shouldSave}
      >
        Опублікувати проект
      </Button>
    </Box>
  );
};

export default SidebarTools;
