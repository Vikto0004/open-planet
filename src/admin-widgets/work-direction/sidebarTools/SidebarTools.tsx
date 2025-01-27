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
  const isLoading = status === "pending";

  const getContentByType = (type: allowedSections) => {
    switch (type) {
      case "paragraph":
        return ["Default paragraph text"];
      case "title":
        return "Default title";
      case "subtitle":
        return "Default subtitle";
      case "budgetCards":
        return [{ title: "Card title", amount: "1000" }];
      case "imageList":
        return ["https://example.com/image1.jpg"];
      default:
        return null;
    }
  };

  const handleButtonClick = (type: allowedSections) => {
    if (isLoading) return;

    const content = getContentByType(type);
    if (!content) {
      console.error("Неправильний тип секції або відсутній контент:", type);
      return;
    }

    if (!id) {
      console.error("Відсутній ідентифікатор проекту!");
      return;
    }

    console.log("Підготовка до запиту. Дані:", { type: type, content });

    mutate(
      { projectId: id, type: type, content },
      {
        onError: (error) => {
          console.error("Помилка створення секції:", error);
        },
        onSuccess: (data) => {
          console.log("Секція успішно створена:", data);
        },
      },
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
        Бюджетні картки
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
