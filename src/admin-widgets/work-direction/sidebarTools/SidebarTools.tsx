import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const SidebarTools = ({
  isPostable,
  shouldSave,
  id
}: {
  isPostable: boolean;
  shouldSave: boolean;
  id:string;
}) => {
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
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Заголовок
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Параграф
      </Button>
      <Button variant="contained" sx={{ textTransform: "none", width: 125 }}>
        Лист
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
