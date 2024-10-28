import { TextField } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  // ChangeEvent,
} from "react";

interface IListItemProps {
  primaryText?: string;
  secondaryText?: number;
  id: string;
  setEdit: Dispatch<SetStateAction<{ id: string; isEdit: boolean }>>;
  isEdit: { id: string; isEdit: boolean };
}

const BudgetListCard = ({
  primaryText,
  secondaryText,
  id,
  setEdit,
  isEdit,
}: IListItemProps) => {
  const [title, setTitle] = useState(primaryText ? primaryText : "");
  const [amount, setAmount] = useState(secondaryText ? secondaryText : "");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEdit && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEdit]);

  const onClick = () => {
    if (isEdit.id !== id) {
      setEdit({ id: id, isEdit: true });
    } else {
      setEdit({ id: id, isEdit: !isEdit.isEdit });
    }
  };

  // const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.target.value);
  // };
  return (
    <>
      <ListItem
        secondaryAction={
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={onClick}
          >
            {isEdit.id === id && isEdit.isEdit ? "Редагується" : "Редагувати"}
          </Button>
        }
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <TextField
            sx={{ width: "150px" }}
            value={title}
            variant="standard"
            disabled={isEdit.id === id ? !isEdit.isEdit : true}
            inputRef={inputRef}
            label="Заголовок"
            onChange={(e) => setTitle(e.target.value)}
            InputProps={{
              disableUnderline: isEdit.id === id ? !isEdit.isEdit : true,
            }}
          ></TextField>
          <TextField
            sx={{ width: "150px" }}
            value={amount}
            variant="standard"
            label="Сума"
            disabled={isEdit.id === id ? !isEdit.isEdit : true}
            onChange={(e) => setAmount(e.target.value)}
            InputProps={{
              disableUnderline: isEdit.id === id ? !isEdit.isEdit : true,
            }}
          ></TextField>
        </Box>
      </ListItem>
      <Divider />
    </>
  );
};

export default BudgetListCard;
