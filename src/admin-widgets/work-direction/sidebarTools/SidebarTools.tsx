import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useCreateSection } from "@/admin-shared/hooks/work-direction/useCreateSection";
import { allowedSections } from "@/admin-shared/model/interfaces/workDirectionInterfaces";

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

  // Альтернативно: const { mutate, isLoading } = useCreateSection();
  const isLoading = status === "pending";

  const handleButtonClick = (type: allowedSections) => {
    if (isLoading) return; // Заборона повторних кліків, поки йде запит
    console.log("Тип передано на сервер:", type);
    mutate(
      { projectId: id, type },
      {
        onError: (error) => {
          console.error("Помилка створення секції:", error);
        },
      }
    );
  };

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
        onClick={() => handleButtonClick("title")}
        disabled={isLoading}
      >
        Заголовок
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => handleButtonClick("subtitle")}
        disabled={isLoading}
      >
        Підзаголовок
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => handleButtonClick("paragraph")}
        disabled={isLoading}
      >
        Параграф
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => handleButtonClick("budgetCards")}
        disabled={isLoading}
      >
        Бюджентні картки
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        onClick={() => handleButtonClick("imageList")}
        disabled={isLoading}
      >
        Зображення
      </Button>
      <Button
        variant="contained"
        sx={{ textTransform: "none", width: 125 }}
        disabled={!isPostable || shouldSave || isLoading}
      >
        Опублікувати проект
      </Button>
    </Box>
  );
};

export default SidebarTools;
